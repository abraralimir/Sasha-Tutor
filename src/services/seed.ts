
import { addInitialCourses, Course } from './course-service';
import { generateFullCourseContent } from '@/lib/actions';

const initialCourses: Course[] = [
    {
        id: 'python',
        title: "Sasha's Python Path",
        showOnHomepage: true,
        chapters: [
            {
                id: 'chapter-1',
                title: 'Level 1: Beginner (Foundations)',
                lessons: [
                    { id: 'lesson-1-1', title: 'Introduction to Python & Setup', content: [] },
                    { id: 'lesson-1-2', title: 'Python Syntax & First Program', content: [] },
                    { id: 'lesson-1-3', title: 'Comments & Code Structure', content: [] },
                    { id: 'lesson-1-4', title: 'Variables & Data Types', content: [] },
                    { id: 'lesson-1-5', title: 'Numbers & Math Operations', content: [] },
                    { id: 'lesson-1-6', title: 'Strings & String Operations', content: [] },
                    { id: 'lesson-1-7', title: 'Booleans & Logical Operators', content: [] },
                ]
            },
            {
                id: 'chapter-2',
                title: 'Level 2: Control Flow',
                lessons: [
                    { id: 'lesson-2-1', title: 'if, elif, else Statements', content: [] },
                    { id: 'lesson-2-2', title: 'for Loops', content: [] },
                    { id: 'lesson-2-3', title: 'while Loops', content: [] },
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
                    { id: 'excel-1-1', title: 'Understanding the Excel Interface', content: [] },
                    { id: 'excel-1-2', title: 'Entering and Formatting Data', content: [] },
                    { id: 'excel-1-3', title: 'Basic Formulas (SUM, AVERAGE, COUNT)', content: [] },
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
                    { id: 'sap-fico-1-1', title: 'What is SAP and ERP?', content: [] },
                    { id: 'sap-fico-1-2', title: 'Overview of SAP Modules', content: [] },
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
                    { id: 'cloud-1-1', title: 'What is Cloud Computing?', content: [] },
                    { id: 'cloud-1-2', title: 'Cloud Service Models (IaaS, PaaS, SaaS)', content: [] },
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
                    { id: 'da-1-1', title: 'Introduction to Data Analytics', content: [] },
                    { id: 'da-1-2', title: 'Working with Jupyter Notebooks', content: [] },
                    { id: 'da-1-3', title: 'Introduction to NumPy for Numerical Data', content: [] },
                ]
            },
        ]
    }
];

export async function seedInitialCourses() {
    console.log('Seeding initial courses to Firestore...');
    try {
        // The generateFullCourseContent function will be passed to addInitialCourses
        // to be called for any featured courses that need content.
        await addInitialCourses(initialCourses, generateFullCourseContent);
        console.log('Initial courses have been successfully seeded.');
    } catch (error) {
        console.error('Error seeding initial courses:', error);
    }
}
