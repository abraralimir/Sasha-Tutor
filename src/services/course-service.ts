
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  DocumentData,
  QueryDocumentSnapshot,
  where,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import type { GenerateCourseOutput } from "@/ai/flows/generate-course";

// In a real application, this data would likely come from a database or a CMS.
// For this prototype, we'll keep it in a local file.
export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}
export interface Lesson {
    id: string;
    title: string;
    content?: string; // Markdown content with special placeholders
    quiz?: QuizQuestion[];
}

export interface Chapter {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: string;
    title: string;
    chapters: Chapter[];
}

const courseCollection = collection(db, 'courses');

// Helper to convert Firestore doc to Course object
const fromFirestore = (doc: QueryDocumentSnapshot<DocumentData> | DocumentData): Course => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        chapters: data.chapters || [],
    };
};


export function getCourses(callback: (courses: Course[], error?: string) => void): () => void {
  const q = query(courseCollection);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const courses = querySnapshot.docs.map(fromFirestore);
    callback(courses);
  }, (error) => {
    console.error("Error fetching courses: ", error);
    callback([], "Failed to fetch courses.");
  });

  return unsubscribe;
}


export async function getCourse(courseId: string): Promise<Course | null> {
    if (!courseId) return null;
    try {
        const docRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Course;
        } else {
            // Fallback for documents that might have been created with addDoc
             const q = query(courseCollection, where("id", "==", courseId));
             const querySnapshot = await getDocs(q);
             if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                return fromFirestore(docSnap);
             }
            console.log("No such course!");
            return null;
        }
    } catch (error) {
        console.error("Error getting course:", error);
        return null;
    }
}


export async function addCourse(course: Omit<Course, 'id'> & { id?: string }): Promise<string> {
  try {
    const courseId = course.id || course.title.toLowerCase().replace(/\s+/g, '-');
    const docRef = doc(db, 'courses', courseId);
    await setDoc(docRef, { ...course, id: courseId });
    return courseId;
  } catch (error) {
    console.error("Error adding course: ", error);
    throw new Error("Failed to add course.");
  }
}

export async function addInitialCourses(courses: Course[]): Promise<void> {
    const batch = writeBatch(db);
    const coursesQuery = query(collection(db, 'courses'));
    const existingCoursesSnapshot = await getDocs(coursesQuery);
    const existingCourseIds = new Set(existingCoursesSnapshot.docs.map(doc => doc.id));

    courses.forEach(course => {
        if (!existingCourseIds.has(course.id)) {
            const docRef = doc(db, 'courses', course.id);
            batch.set(docRef, course);
        }
    });

    await batch.commit();
}


export async function updateCourse(courseId: string, course: Partial<Omit<Course, 'id'>>): Promise<void> {
    try {
        const docRef = doc(db, 'courses', courseId);
        await setDoc(docRef, course, { merge: true });
    } catch (error) {
        console.error("Error updating course: ", error);
        throw new Error("Failed to update course.");
    }
}

export async function deleteCourse(courseId: string): Promise<void> {
    try {
        const docRef = doc(db, 'courses', courseId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting course: ", error);
        throw new Error("Failed to delete course.");
    }
}


export function formatGeneratedCourse(generated: GenerateCourseOutput): Course {
    const courseId = generated.id.toLowerCase().replace(/\s+/g, '-');
    return {
        ...generated,
        id: courseId,
        chapters: generated.chapters.map(chapter => ({
            ...chapter,
            lessons: chapter.lessons.map(lesson => ({
                ...lesson,
                content: '' // Initialize with empty content
            }))
        }))
    }
}
