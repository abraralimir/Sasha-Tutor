
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
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import type { GenerateCourseOutput } from "@/ai/flows/generate-course";

// In a real application, this data would likely come from a database or a CMS.
// For this prototype, we'll keep it in a local file.
export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export type ContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'interactiveCode'; description: string; expectedOutput: string };

export interface Lesson {
    id: string;
    title: string;
    content?: ContentBlock[]; // Changed from string to ContentBlock[]
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
    showOnHomepage?: boolean;
}

// New interfaces for user data
export interface UserCourse {
    courseId: string;
    startedAt: Timestamp;
    completedLessons: string[];
}

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string | null;
    courses: UserCourse[];
    dailyGenerationCount?: number;
    lastGenerationDate?: string;
}

const courseCollection = collection(db, 'courses');
const usersCollection = collection(db, 'users');

// Helper to convert Firestore doc to Course object
const fromFirestore = (doc: QueryDocumentSnapshot<DocumentData> | DocumentData): Course => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        chapters: data.chapters || [],
        showOnHomepage: data.showOnHomepage || false,
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

export async function updateLessonContent(courseId: string, chapterId: string, lessonId: string, content: ContentBlock[]): Promise<void> {
    try {
        const courseRef = doc(db, 'courses', courseId);
        const courseSnap = await getDoc(courseRef);
        if (!courseSnap.exists()) {
            throw new Error("Course not found");
        }
        
        const courseData = courseSnap.data() as Course;
        const updatedChapters = courseData.chapters.map(chapter => {
            if (chapter.id === chapterId) {
                return {
                    ...chapter,
                    lessons: chapter.lessons.map(lesson => {
                        if (lesson.id === lessonId) {
                            return { ...lesson, content };
                        }
                        return lesson;
                    })
                };
            }
            return chapter;
        });

        await updateDoc(courseRef, { chapters: updatedChapters });

    } catch (error) {
        console.error("Error updating lesson content: ", error);
        throw new Error("Failed to update lesson content.");
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
                content: [] // Initialize with empty content array
            }))
        })),
        showOnHomepage: false, // AI courses are not featured by default
    }
}

// User Profile and Progress Functions

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!uid) return null;
    try {
        const userRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            // Ensure courses array exists
            const data = docSnap.data();
            if (!data.courses) {
                data.courses = [];
            }
            return data as UserProfile;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export function getUserProfileStream(uid: string, callback: (profile: UserProfile | null) => void): () => void {
    const userRef = doc(db, 'users', uid);
    return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            if (!data.courses) {
                data.courses = [];
            }
            callback(data as UserProfile);
        } else {
            callback(null);
        }
    });
}

export async function associateCourseWithUser(uid: string, courseId: string): Promise<void> {
    const userRef = doc(db, 'users', uid);
    const userProfile = await getUserProfile(uid);

    // Safely check if the courses array exists and if the course is already associated
    if (userProfile && (userProfile.courses || []).some(c => c.courseId === courseId)) {
        console.log("User already has this course.");
        return;
    }

    const newCourse: UserCourse = {
        courseId,
        startedAt: Timestamp.now(),
        completedLessons: [],
    };
    
    // Use setDoc with merge to initialize the courses array if it doesn't exist
    await setDoc(userRef, {
        courses: arrayUnion(newCourse)
    }, { merge: true });
}

export async function updateUserLessonProgress(uid: string, courseId: string, lessonId: string, completed: boolean): Promise<void> {
    const userRef = doc(db, 'users', uid);
    const userProfile = await getUserProfile(uid);
    if (!userProfile) return;

    const courseIndex = (userProfile.courses || []).findIndex(c => c.courseId === courseId);
    if (courseIndex === -1) return;

    const updatedCourses = [...userProfile.courses];
    const currentCompleted = updatedCourses[courseIndex].completedLessons;

    if (completed && !currentCompleted.includes(lessonId)) {
        updatedCourses[courseIndex].completedLessons.push(lessonId);
    } else if (!completed) {
        updatedCourses[courseIndex].completedLessons = currentCompleted.filter(id => id !== lessonId);
    }
    
    await updateDoc(userRef, { courses: updatedCourses });
}
