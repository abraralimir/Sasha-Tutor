
import type { GenerateCourseOutput } from "@/ai/flows/generate-course";

// In a real application, this data would likely come from a database or a CMS.
// For this prototype, we'll keep it in a local file.

export interface Lesson {
    id: string;
    title: string;
    content: string; // Markdown content with special placeholders
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

const pythonCourse: Course = {
    id: 'python',
    title: 'Sasha\'s Python Path',
    chapters: [
        {
            id: 'chapter-1',
            title: 'Level 1: Beginner (Foundations)',
            lessons: [
                { id: 'lesson-1-1', title: 'Introduction to Python & Setup', content: '' },
                { id: 'lesson-1-2', title: 'Python Syntax & First Program', content: '' },
                { id: 'lesson-1-3', title: 'Comments & Code Structure', content: '' },
                { id: 'lesson-1-4', title: 'Variables & Data Types', content: '' },
                { id: 'lesson-1-5', title: 'Numbers & Math Operations', content: '' },
                { id: 'lesson-1-6', title: 'Strings & String Operations', content: '' },
                { id: 'lesson-1-7', title: 'Booleans & Logical Operators', content: '' },
                { id: 'lesson-1-8', title: 'Type Conversion & Input/Output', content: '' },
                { id: 'lesson-1-9', title: 'Basic Error Handling (try/except)', content: '' }
            ]
        },
        {
            id: 'chapter-2',
            title: 'Level 2: Control Flow',
            lessons: [
                { id: 'lesson-2-1', title: 'if, elif, else Statements', content: '' },
                { id: 'lesson-2-2', title: 'for Loops', content: '' },
                { id: 'lesson-2-3', title: 'while Loops', content: '' },
                { id: 'lesson-2-4', title: 'Loop Control (break, continue, pass)', content: '' },
                { id: 'lesson-2-5', title: 'List Comprehensions', content: '' }
            ]
        },
		{
            id: 'chapter-3',
            title: 'Level 3: Data Structures',
            lessons: [
                { id: 'lesson-3-1', title: 'Lists', content: '' },
                { id: 'lesson-3-2', title: 'Tuples', content: '' },
                { id: 'lesson-3-3', title: 'Sets', content: '' },
                { id: 'lesson-3-4', title: 'Dictionaries', content: '' },
                { id: 'lesson-3-5', title: 'Nested Data Structures', content: '' }
            ]
        },
        {
            id: 'chapter-4',
            title: 'Level 4: Functions & Modules',
            lessons: [
                 { id: 'lesson-4-1', title: 'Defining & Calling Functions', content: '' },
                 { id: 'lesson-4-2', title: 'Function Arguments (*args, **kwargs)', content: '' },
                 { id: 'lesson-4-3', title: 'Return Values', content: '' },
                 { id: 'lesson-4-4', title: 'Lambda Functions', content: '' },
                 { id: 'lesson-4-5', title: 'Scope & Global Variables', content: '' },
                 { id: 'lesson-4-6', title: 'Importing & Using Modules', content: '' },
                 { id: 'lesson-4-7', title: 'Creating Your Own Modules', content: '' }
            ]
        },
        {
            id: 'chapter-5',
            title: 'Level 5: File Handling',
            lessons: [
                { id: 'lesson-5-1', title: 'Reading Files', content: '' },
                { id: 'lesson-5-2', title: 'Writing Files', content: '' },
                { id: 'lesson-5-3', title: 'Working with CSV Files', content: '' },
                { id: 'lesson-5-4', title: 'Working with JSON Files', content: '' }
            ]
        },
        {
            id: 'chapter-6',
            title: 'Level 6: Error & Exception Handling',
            lessons: [
                 { id: 'lesson-6-1', title: 'Common Python Errors', content: '' },
                 { id: 'lesson-6-2', title: 'try, except, finally', content: '' },
                 { id: 'lesson-6-3', title: 'Raising Exceptions (raise)', content: '' },
                 { id: 'lesson-6-4', title: 'Custom Exceptions', content: '' }
            ]
        },
        {
            id: 'chapter-7',
            title: 'Level 7: Object-Oriented Programming (OOP)',
            lessons: [
                { id: 'lesson-7-1', title: 'Classes & Objects', content: '' },
                { id: 'lesson-7-2', title: 'Methods (self)', content: '' },
                { id: 'lesson-7-3', title: 'Inheritance', content: '' },
                { id: 'lesson-7-4', title: 'Special Methods (__str__, __len__)', content: '' }
            ]
        },
        {
            id: 'chapter-8',
            title: 'Level 8: Advanced Python',
            lessons: [
                { id: 'lesson-8-1', title: 'Iterators & Generators', content: '' },
                { id: 'lesson-8-2', title: 'Decorators', content: '' },
                { id: 'lesson-8-3', title: 'Regular Expressions (re)', content: '' }
            ]
        },
        {
            id: 'chapter-9',
            title: 'Level 9: Python for Data & Automation',
            lessons: [
                { id: 'lesson-9-1', title: 'Using pip & Installing Packages', content: '' },
                { id: 'lesson-9-2', title: 'Working with requests (HTTP)', content: '' },
                { id: 'lesson-9-3', title: 'Intro to Pandas & Matplotlib', content: '' }
            ]
        },
        {
            id: 'chapter-10',
            title: 'Level 10: Final Stage – Projects & Practice',
            lessons: [
                { id: 'lesson-10-1', title: 'Projects & Practice', content: '' }
            ]
        }
    ]
};

const excelCourse: Course = {
    id: 'excel',
    title: 'Mastering Excel',
    chapters: [
        {
            id: 'excel-chapter-1',
            title: 'Level 1: Excel Basics',
            lessons: [
                { id: 'excel-1-1', title: 'Understanding the Excel Interface', content: '' },
                { id: 'excel-1-2', title: 'Entering and Formatting Data', content: '' },
                { id: 'excel-1-3', title: 'Basic Formulas (SUM, AVERAGE, COUNT)', content: '' },
                { id: 'excel-1-4', title: 'Working with Rows, Columns, and Sheets', content: '' },
                { id: 'excel-1-5', title: 'Introduction to Charts', content: '' }
            ]
        },
        {
            id: 'excel-chapter-2',
            title: 'Level 2: Intermediate Formulas',
            lessons: [
                { id: 'excel-2-1', title: 'Logical Functions (IF, AND, OR)', content: '' },
                { id: 'excel-2-2', title: 'Lookup Functions (VLOOKUP, HLOOKUP)', content: '' },
                { id: 'excel-2-3', title: 'Text Functions (CONCATENATE, LEFT, RIGHT)', content: '' },
                { id: 'excel-2-4', title: 'Date and Time Functions', content: '' },
                { id: 'excel-2-5', title: 'Advanced Formulas (INDEX, MATCH)', content: '' }
            ]
        },
        {
            id: 'excel-chapter-3',
            title: 'Level 3: Data Analysis Tools',
            lessons: [
                { id: 'excel-3-1', title: 'Sorting and Filtering Data', content: '' },
                { id: 'excel-3-2', title: 'Conditional Formatting', content: '' },
                { id: 'excel-3-3', title: 'Creating and Using Tables', content: '' },
                { id: 'excel-3-4', title: 'Introduction to PivotTables', content: '' },
                { id: 'excel-3-5', title: 'Data Validation', content: '' }
            ]
        }
    ]
};

const sapFicoCourse: Course = {
    id: 'sap-fico',
    title: 'SAP FICO Fundamentals',
    chapters: [
        {
            id: 'sap-fico-chapter-1',
            title: 'Level 1: Introduction to SAP & ERP',
            lessons: [
                { id: 'sap-fico-1-1', title: 'What is SAP and ERP?', content: '' },
                { id: 'sap-fico-1-2', title: 'Overview of SAP Modules', content: '' },
                { id: 'sap-fico-1-3', title: 'Introduction to SAP FICO', content: '' },
                { id: 'sap-fico-1-4', title: 'Navigating the SAP System', content: '' }
            ]
        },
        {
            id: 'sap-fico-chapter-2',
            title: 'Level 2: Core FICO Modules',
            lessons: [
                { id: 'sap-fico-2-1', title: 'General Ledger (G/L) Accounting', content: '' },
                { id: 'sap-fico-2-2', title: 'Accounts Payable (AP)', content: '' },
                { id: 'sap-fico-2-3', title: 'Accounts Receivable (AR)', content: '' },
                { id: 'sap-fico-2-4', title: 'Asset Accounting (AA)', content: '' }
            ]
        },
        {
            id: 'sap-fico-chapter-3',
            title: 'Level 3: Key Processes & Reporting',
            lessons: [
                { id: 'sap-fico-3-1', title: 'The Procure-to-Pay Process', content: '' },
                { id: 'sap-fico-3-2', title: 'The Order-to-Cash Process', content: '' },
                { id: 'sap-fico-3-3', title: 'Financial Closing and Reporting', content: '' },
                { id: 'sap-fico-3-4', title: 'Introduction to Controlling (CO)', content: '' }
            ]
        }
    ]
};

const cloudCourse: Course = {
    id: 'cloud-learning',
    title: 'Introduction to Cloud Computing',
    chapters: [
        {
            id: 'cloud-chapter-1',
            title: 'Level 1: Cloud Fundamentals',
            lessons: [
                { id: 'cloud-1-1', title: 'What is Cloud Computing?', content: '' },
                { id: 'cloud-1-2', title: 'Cloud Service Models (IaaS, PaaS, SaaS)', content: '' },
                { id: 'cloud-1-3', title: 'Cloud Deployment Models (Public, Private, Hybrid)', content: '' },
                { id: 'cloud-1-4', title: 'Key Cloud Providers (AWS, Azure, GCP)', content: '' }
            ]
        },
        {
            id: 'cloud-chapter-2',
            title: 'Level 2: Core Cloud Services',
            lessons: [
                { id: 'cloud-2-1', title: 'Compute Services (Virtual Machines)', content: '' },
                { id: 'cloud-2-2', title: 'Storage Services (Object & Block Storage)', content: '' },
                { id: 'cloud-2-3', title: 'Networking in the Cloud', content: '' },
                { id: 'cloud-2-4', title: 'Databases in the Cloud', content: '' }
            ]
        },
        {
            id: 'cloud-chapter-3',
            title: 'Level 3: Modern Cloud Concepts',
            lessons: [
                { id: 'cloud-3-1', title: 'Introduction to Serverless Computing', content: '' },
                { id: 'cloud-3-2', title: 'Containers and Orchestration (Docker & Kubernetes)', content: '' },
                { id: 'cloud-3-3', title: 'Cloud Security Fundamentals', content: '' },
                { id: 'cloud-3-4', title: 'Infrastructure as Code (IaC)', content: '' }
            ]
        }
    ]
};

const dataAnalyticsCourse: Course = {
    id: 'data-analytics',
    title: 'Data Analytics with Python',
    chapters: [
        {
            id: 'da-chapter-1',
            title: 'Level 1: Foundations of Data Analytics',
            lessons: [
                { id: 'da-1-1', title: 'Introduction to Data Analytics', content: '' },
                { id: 'da-1-2', title: 'Working with Jupyter Notebooks', content: '' },
                { id: 'da-1-3', title: 'Introduction to NumPy for Numerical Data', content: '' },
                { id: 'da-1-4', title: 'Data Cleaning and Preparation', content: '' }
            ]
        },
        {
            id: 'da-chapter-2',
            title: 'Level 2: Data Manipulation with Pandas',
            lessons: [
                { id: 'da-2-1', title: 'Introduction to Pandas DataFrames', content: '' },
                { id: 'da-2-2', title: 'Importing Data (CSV, Excel)', content: '' },
                { id: 'da-2-3', title: 'Selecting and Filtering Data', content: '' },
                { id: 'da-2-4', title: 'Grouping and Aggregating Data', content: '' },
                { id: 'da-2-5', title: 'Merging and Joining DataFrames', content: '' }
            ]
        },
        {
            id: 'da-chapter-3',
            title: 'Level 3: Data Visualization',
            lessons: [
                { id: 'da-3-1', title: 'Introduction to Matplotlib', content: '' },
                { id: 'da-3-2', title: 'Creating Bar Charts and Histograms', content: '' },
                { id: 'da-3-3', title: 'Creating Line Plots and Scatter Plots', content: '' },
                { id: 'da-3-4', title: 'Advanced Visualization with Seaborn', content: '' }
            ]
        },
        {
            id: 'da-chapter-4',
            title: 'Level 4: Real-World Applications',
            lessons: [
                { id: 'da-4-1', title: 'Fetching Data from Public APIs', content: '' },
                { id: 'da-4-2', title: 'Case Study: Analyzing Weather Data', content: '' },
                { id: 'da-4-3', title: 'Case Study: Exploring Movie Datasets', content: '' }
            ]
        }
    ]
};

const courseCache = new Map<string, Course>();
courseCache.set('python', pythonCourse);
courseCache.set('excel', excelCourse);
courseCache.set('sap-fico', sapFicoCourse);
courseCache.set('cloud-learning', cloudCourse);
courseCache.set('data-analytics', dataAnalyticsCourse);

export function getCourse(topic: string): Course | null {
    const courseId = topic.toLowerCase().replace(/\s+/g, '-');
    return courseCache.get(courseId) || null;
}

export function setCourse(course: Course): void {
    courseCache.set(course.id, course);
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
