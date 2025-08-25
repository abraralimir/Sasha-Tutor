
import { addInitialCourses, Course } from './course-service';
import { generateFullCourseContent } from '@/lib/actions';

const initialCourses: Omit<Course, 'chapters'> & { chapters: Omit<Course['chapters'][0], 'lessons'> & { lessons: Omit<Course['chapters'][0]['lessons'][0], 'content' | 'quiz'>[] }[] }[] = [
    {
        id: 'python',
        title: "Sasha's Python Path",
        showOnHomepage: true,
        chapters: [
            {
                id: 'chapter-1',
                title: 'Level 1: Beginner (Foundations)',
                lessons: [
                    { id: 'lesson-1-1', title: 'Introduction to Python & Setup' },
                    { id: 'lesson-1-2', title: 'Python Syntax & First Program' },
                    { id: 'lesson-1-3', title: 'Comments & Code Structure' },
                    { id: 'lesson-1-4', title: 'Variables & Data Types' },
                    { id: 'lesson-1-5', title: 'Numbers & Math Operations' },
                    { id: 'lesson-1-6', title: 'Strings & String Operations' },
                    { id: 'lesson-1-7', title: 'Booleans & Logical Operators' },
                ]
            },
            {
                id: 'chapter-2',
                title: 'Level 2: Control Flow',
                lessons: [
                    { id: 'lesson-2-1', title: 'if, elif, else Statements' },
                    { id: 'lesson-2-2', title: 'for Loops' },
                    { id: 'lesson-2-3', title: 'while Loops' },
                ]
            },
        ]
    },
    {
        id: 'excel',
        title: 'Mastering Excel',
        showOnHomepage: true,
        chapters: [
            {
                id: 'excel-chapter-1',
                title: 'Level 1: Excel Basics',
                lessons: [
                    { id: 'excel-1-1', title: 'Understanding the Excel Interface' },
                    { id: 'excel-1-2', title: 'Entering and Formatting Data' },
                    { id: 'excel-1-3', title: 'Basic Formulas (SUM, AVERAGE, COUNT)' },
                ]
            },
        ]
    },
    {
        id: 'sap-fico',
        title: 'SAP FICO Fundamentals',
        showOnHomepage: false,
        chapters: [
            {
                id: 'sap-fico-chapter-1',
                title: 'Level 1: Introduction to SAP & ERP',
                lessons: [
                    { id: 'sap-fico-1-1', title: 'What is SAP and ERP?' },
                    { id: 'sap-fico-1-2', title: 'Overview of SAP Modules' },
                ]
            },
        ]
    },
    {
        id: 'cloud-learning',
        title: 'Introduction to Cloud Computing',
        showOnHomepage: false,
        chapters: [
            {
                id: 'cloud-chapter-1',
                title: 'Level 1: Cloud Fundamentals',
                lessons: [
                    { id: 'cloud-1-1', title: 'What is Cloud Computing?' },
                    { id: 'cloud-1-2', title: 'Cloud Service Models (IaaS, PaaS, SaaS)' },
                ]
            }
        ]
    },
    {
        id: 'data-analytics',
        title: 'Data Analytics with Python',
        showOnHomepage: true,
        chapters: [
            {
                id: 'da-chapter-1',
                title: 'Level 1: Foundations of Data Analytics',
                lessons: [
                    { id: 'da-1-1', title: 'Introduction to Data Analytics' },
                    { id: 'da-1-2', title: 'Working with Jupyter Notebooks' },
                    { id: 'da-1-3', title: 'Introduction to NumPy for Numerical Data' },
                ]
            },
        ]
    }
];

// This function transforms the simplified initialCourses structure into the full Course structure.
const getFullCourses = (): Course[] => {
    return initialCourses.map(course => ({
        ...course,
        chapters: course.chapters.map(chapter => ({
            ...chapter,
            lessons: chapter.lessons.map(lesson => ({
                ...lesson,
                content: [], // Initialize with empty content, to be filled by AI
                quiz: []      // Initialize with empty quiz, to be filled by AI
            }))
        }))
    }));
};


export async function seedInitialCourses() {
    console.log('Seeding initial courses to Firestore...');
    try {
        const coursesToSeed = getFullCourses();
        // The generateFullCourseContent function will be passed to addInitialCourses
        // to be called for any featured courses that need content.
        await addInitialCourses(coursesToSeed, generateFullCourseContent);
        console.log('Initial courses have been successfully seeded.');
    } catch (error) {
        console.error('Error seeding initial courses:', error);
    }
}
