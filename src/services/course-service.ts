
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

const pythonCourse: Course = {
    id: 'python',
    title: 'Sasha\'s Python Path',
    chapters: [
        {
            id: 'chapter-1',
            title: 'Level 1: Beginner (Foundations)',
            lessons: [
                { 
                    id: 'lesson-1-1', 
                    title: 'Introduction to Python & Setup', 
                    content: `
<h1>Welcome to Python!</h1>
<p>Python is a powerful, versatile, and beginner-friendly programming language. It's used everywhere, from web development (like Instagram and YouTube) to data science, artificial intelligence, and more.</p>
<h2>What is a Programming Language?</h2>
<p>Think of it as a set of instructions you can give to a computer to make it perform tasks. Just like we use languages like English to communicate with each other, we use programming languages like Python to communicate with computers.</p>
<h2>Why Python?</h2>
<ul>
    <li><strong>Readable and Simple:</strong> Python's syntax is clean and easy to read, which makes it an excellent language for beginners. It often reads a lot like plain English.</li>
    <li><strong>Versatile:</strong> You can build almost anything with Python. Web apps, games, data analysis tools, robots—you name it.</li>
    <li><strong>Huge Community:</strong> Millions of developers use Python, which means there's a vast amount of libraries (pre-written code) and resources available to help you.</li>
</ul>
<h2>Your First Program: "Hello, World!"</h2>
<p>The traditional first program for any new language is one that prints "Hello, World!" to the screen. In Python, it's incredibly simple. You use the <code>print()</code> function.</p>
<p>A <strong>function</strong> is a reusable block of code that performs a specific action. The <code>print()</code> function's action is to display text or other data on the screen.</p>
<p>Now it's your turn. Use the interactive cell below to write the code that prints "Hello, World!" to the screen.</p>
<interactive-code-cell description="Write a single line of Python code to print the text 'Hello, World!'" expected="print('Hello, World!')" />
                    `,
                    quiz: [
                        {
                            question: "What is the primary function of the `print()` command in Python?",
                            options: ["To do math", "To display text on the screen", "To save a file", "To get user input"],
                            correctAnswer: "To display text on the screen"
                        },
                        {
                            question: "Which of the following is a key reason Python is recommended for beginners?",
                            options: ["It's the oldest programming language", "It's only used for web development", "Its syntax is clean and readable", "It doesn't require a computer to run"],
                            correctAnswer: "Its syntax is clean and readable"
                        }
                    ]
                },
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
                { 
                    id: 'excel-1-1', 
                    title: 'Understanding the Excel Interface', 
                    content: `
<h1>Welcome to Microsoft Excel!</h1>
<p>Excel is the world's most popular spreadsheet program, used by millions for everything from simple budgeting to complex data analysis. Mastering it is a valuable skill in almost any profession.</p>
<h2>What is a Spreadsheet?</h2>
<p>A spreadsheet is a grid of cells arranged in rows and columns. Each cell can hold data, such as text, numbers, or formulas. This simple structure allows you to organize data, perform calculations, and create powerful visualizations.</p>
<h2>Key Components of the Excel Interface</h2>
<ul>
    <li><strong>Ribbon:</strong> The collection of tabs and icons at the top of the screen (Home, Insert, Page Layout, etc.) that contains all of Excel's main tools.</li>
    <li><strong>Formula Bar:</strong> Located above the grid, this bar shows the contents of the selected cell. It's where you'll write and edit formulas.</li>
    <li><strong>Cells:</strong> The individual boxes that make up the grid. Each cell has an address, like A1, B2, etc. (Column letter, Row number).</li>
    <li><strong>Worksheets (Tabs):</strong> An Excel file, called a Workbook, can contain multiple sheets. You can see these as tabs at the bottom of the screen.</li>
</ul>
<h2>Your First Formula: SUM</h2>
<p>Formulas are the heart of Excel. They always start with an equals sign (<code>=</code>). The <code>SUM</code> function is one of the most common; it adds up a range of numbers.</p>
<p>For example, <code>=SUM(A1:A5)</code> would add up the numbers in cells A1, A2, A3, A4, and A5.</p>
<p>Now it's your turn. Imagine you have the number 10 in cell A1 and 20 in cell A2. What formula would you write in cell A3 to add them together?</p>
<interactive-code-cell description="Write an Excel formula to add the values in cells A1 and A2." expected="=SUM(A1:A2)" />
                    `,
                    quiz: [
                        {
                            question: "In Excel, what symbol must every formula begin with?",
                            options: ["@", "#", "=", "!"],
                            correctAnswer: "="
                        },
                        {
                            question: "What is the correct way to refer to the cell in the first column and second row?",
                            options: ["2A", "B1", "1B", "A2"],
                            correctAnswer: "A2"
                        }
                    ]
                },
                { id: 'excel-1-2', title: 'Entering and Formatting Data' },
                { id: 'excel-1-3', title: 'Basic Formulas (SUM, AVERAGE, COUNT)' },
                { id: 'excel-1-4', title: 'Working with Rows, Columns, and Sheets' },
                { id: 'excel-1-5', title: 'Introduction to Charts' }
            ]
        },
        {
            id: 'excel-chapter-2',
            title: 'Level 2: Intermediate Formulas',
            lessons: [
                { id: 'excel-2-1', title: 'Logical Functions (IF, AND, OR)' },
                { id: 'excel-2-2', title: 'Lookup Functions (VLOOKUP, HLOOKUP)' },
                { id: 'excel-2-3', title: 'Text Functions (CONCATENATE, LEFT, RIGHT)' },
                { id: 'excel-2-4', title: 'Date and Time Functions' },
                { id: 'excel-2-5', title: 'Advanced Formulas (INDEX, MATCH)' }
            ]
        },
        {
            id: 'excel-chapter-3',
            title: 'Level 3: Data Analysis Tools',
            lessons: [
                { id: 'excel-3-1', title: 'Sorting and Filtering Data' },
                { id: 'excel-3-2', title: 'Conditional Formatting' },
                { id: 'excel-3-3', title: 'Creating and Using Tables' },
                { id: 'excel-3-4', title: 'Introduction to PivotTables' },
                { id: 'excel-3-5', title: 'Data Validation' }
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
                { 
                    id: 'sap-fico-1-1', 
                    title: 'What is SAP and ERP?',
                    content: `
<h1>Understanding SAP and ERP</h1>
<p>Welcome to the world of SAP! If you're interested in a career in business, finance, or IT, understanding SAP is a huge advantage.</p>
<h2>What is ERP?</h2>
<p>ERP stands for <strong>Enterprise Resource Planning</strong>. At its core, an ERP system is a software platform that helps a company manage all of its essential business processes in one integrated system. Imagine a single source of truth for everything: finance, human resources, manufacturing, supply chain, services, and more.</p>
<p>Without an ERP, different departments might use different, disconnected software, leading to inefficiency and errors. An ERP brings it all together.</p>
<h2>What is SAP?</h2>
<p>SAP is the world's leading provider of ERP software. The company's name is an acronym for <em>Systems, Applications, and Products in Data Processing</em>. When people say they "work with SAP," they usually mean they work with the SAP S/4HANA or SAP ERP software suite.</p>
<h2>What is FICO?</h2>
<p>SAP's software is divided into different <strong>modules</strong> that correspond to business departments. FICO is actually two of these modules combined:</p>
<ul>
    <li><strong>FI - Financial Accounting:</strong> This is the "external" accounting module. It's used for tracking all financial transactions in a company and generating financial statements like balance sheets and income statements for external reporting.</li>
    <li><strong>CO - Controlling:</strong> This is the "internal" accounting module. It's used for internal management purposes, such as tracking costs, managing budgets, and analyzing profitability. It helps managers make informed decisions.</li>
</ul>
<p>Together, FI and CO are tightly integrated to provide a complete picture of a company's financial health.</p>
                    `,
                    quiz: [
                        {
                            question: "What does ERP stand for?",
                            options: ["Enterprise Resource Planning", "External Reporting Platform", "Essential Retail Pricing", "Employee Resource Program"],
                            correctAnswer: "Enterprise Resource Planning"
                        },
                        {
                            question: "Which SAP module is used for internal cost tracking and management decision-making?",
                            options: ["FI (Financial Accounting)", "CO (Controlling)", "HR (Human Resources)", "SD (Sales and Distribution)"],
                            correctAnswer: "CO (Controlling)"
                        }
                    ]
                },
                { id: 'sap-fico-1-2', title: 'Overview of SAP Modules' },
                { id: 'sap-fico-1-3', title: 'Introduction to SAP FICO' },
                { id: 'sap-fico-1-4', title: 'Navigating the SAP System' }
            ]
        },
        {
            id: 'sap-fico-chapter-2',
            title: 'Level 2: Core FICO Modules',
            lessons: [
                { id: 'sap-fico-2-1', title: 'General Ledger (G/L) Accounting' },
                { id: 'sap-fico-2-2', title: 'Accounts Payable (AP)' },
                { id: 'sap-fico-2-3', title: 'Accounts Receivable (AR)' },
                { id: 'sap-fico-2-4', title: 'Asset Accounting (AA)' }
            ]
        },
        {
            id: 'sap-fico-chapter-3',
            title: 'Level 3: Key Processes & Reporting',
            lessons: [
                { id: 'sap-fico-3-1', title: 'The Procure-to-Pay Process' },
                { id: 'sap-fico-3-2', title: 'The Order-to-Cash Process' },
                { id: 'sap-fico-3-3', title: 'Financial Closing and Reporting' },
                { id: 'sap-fico-3-4', title: 'Introduction to Controlling (CO)' }
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
                { 
                    id: 'cloud-1-1', 
                    title: 'What is Cloud Computing?',
                    content: `
<h1>What is Cloud Computing?</h1>
<p>Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining your own physical servers and data centers, you can access technology services, such as computing power, storage, and databases, on an as-needed basis from a cloud provider like Amazon Web Services (AWS), Microsoft Azure, or Google Cloud.</p>
<h2>The Core Idea</h2>
<p>Think of it like your electricity supply. You don't own your own power plant. You just plug into the wall and pay a company for the electricity you use. Cloud computing is the same for computer resources. You "plug in" to the internet and use the resources you need, paying only for what you consume.</p>
<h2>Key Benefits of the Cloud</h2>
<ul>
    <li><strong>Agility:</strong> Access a broad range of technologies instantly, allowing you to innovate faster and build nearly anything you can imagine.</li>
    <li><strong>Elasticity:</strong> You don't have to over-provision resources upfront. You can scale resources up or down instantly as your traffic or needs change.</li>
    <li><strong>Cost Savings:</strong> Trade capital expense (buying hardware) for variable expense (paying for what you use).</li>
    <li><strong>Global Reach:</strong> Deploy your applications in multiple regions around the world with just a few clicks, providing lower latency and better experiences for your customers.</li>
</ul>
<p>In short, cloud computing gives you access to powerful, enterprise-grade technology without the upfront cost and complexity of managing it yourself.</p>
                    `,
                    quiz: [
                        {
                            question: "What is the pricing model most commonly associated with cloud computing?",
                            options: ["Fixed monthly subscription", "One-time purchase", "Pay-as-you-go", "Free with ads"],
                            correctAnswer: "Pay-as-you-go"
                        },
                        {
                            question: "Which of the following is a primary benefit of cloud computing?",
                            options: ["You must manage your own physical servers", "It allows you to trade capital expense for variable expense", "It is slower than on-premise servers", "It has a limited global reach"],
                            correctAnswer: "It allows you to trade capital expense for variable expense"
                        }
                    ]
                },
                { id: 'cloud-1-2', title: 'Cloud Service Models (IaaS, PaaS, SaaS)' },
                { id: 'cloud-1-3', title: 'Cloud Deployment Models (Public, Private, Hybrid)' },
                { id: 'cloud-1-4', title: 'Key Cloud Providers (AWS, Azure, GCP)' }
            ]
        },
        {
            id: 'cloud-chapter-2',
            title: 'Level 2: Core Cloud Services',
            lessons: [
                { id: 'cloud-2-1', title: 'Compute Services (Virtual Machines)' },
                { id: 'cloud-2-2', title: 'Storage Services (Object & Block Storage)' },
                { id: 'cloud-2-3', title: 'Networking in the Cloud' },
                { id: 'cloud-2-4', title: 'Databases in the Cloud' }
            ]
        },
        {
            id: 'cloud-chapter-3',
            title: 'Level 3: Modern Cloud Concepts',
            lessons: [
                { id: 'cloud-3-1', title: 'Introduction to Serverless Computing' },
                { id: 'cloud-3-2', title: 'Containers and Orchestration (Docker & Kubernetes)' },
                { id: 'cloud-3-3', title: 'Cloud Security Fundamentals' },
                { id: 'cloud-3-4', title: 'Infrastructure as Code (IaC)' }
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
                { 
                    id: 'da-1-1', 
                    title: 'Introduction to Data Analytics',
                    content: `
<h1>Welcome to Data Analytics!</h1>
<p>Data analytics is the science of analyzing raw data to make conclusions about that information. It's a field at the intersection of statistics, computer science, and business knowledge. The goal is to discover useful information, draw conclusions, and support decision-making.</p>
<h2>Why is Data Analytics Important?</h2>
<p>In today's world, data is everywhere. Companies that can make sense of their data have a huge competitive advantage. They can:</p>
<ul>
    <li>Understand customer behavior and preferences.</li>
    <li>Optimize processes and improve efficiency.</li>
    <li>Personalize marketing campaigns.</li>
    <li>Identify new business opportunities.</li>
</ul>
<h2>The Data Analytics Process</h2>
<p>A typical data analytics project follows several key steps:</p>
<ol>
    <li><strong>Ask:</strong> Define the question you're trying to answer.</li>
    <li><strong>Prepare:</strong> Collect, clean, and format the data. This is often the most time-consuming step!</li>
    <li><strong>Process:</strong> Analyze the data using statistical methods and tools.</li>
    <li><strong>Analyze:</strong> Interpret the results to find patterns and insights.</li>
    <li><strong>Share:</strong> Communicate your findings through reports and visualizations.</li>
    <li><strong>Act:</strong> Use the insights to make better decisions.</li>
</ol>
<h2>Tools of the Trade</h2>
<p>Data analysts use a variety of tools, including spreadsheets (like Excel), databases (using SQL), and programming languages. In this course, we'll focus on <strong>Python</strong>, which has become the industry standard for data analytics due to powerful libraries like Pandas, NumPy, and Matplotlib.</p>
                    `,
                    quiz: [
                        {
                            question: "What is the primary goal of data analytics?",
                            options: ["To create complex code", "To collect as much data as possible", "To discover useful information and support decision-making", "To build websites"],
                            correctAnswer: "To discover useful information and support decision-making"
                        },
                        {
                            question: "Which step in the data analytics process is often the most time-consuming?",
                            options: ["Ask", "Act", "Share", "Prepare"],
                            correctAnswer: "Prepare"
                        }
                    ]
                 },
                { id: 'da-1-2', title: 'Working with Jupyter Notebooks' },
                { id: 'da-1-3', title: 'Introduction to NumPy for Numerical Data' },
                { id: 'da-1-4', title: 'Data Cleaning and Preparation' }
            ]
        },
        {
            id: 'da-chapter-2',
            title: 'Level 2: Data Manipulation with Pandas',
            lessons: [
                { id: 'da-2-1', title: 'Introduction to Pandas DataFrames' },
                { id: 'da-2-2', title: 'Importing Data (CSV, Excel)' },
                { id: 'da-2-3', title: 'Selecting and Filtering Data' },
                { id: 'da-2-4', title: 'Grouping and Aggregating Data' },
                { id: 'da-2-5', title: 'Merging and Joining DataFrames' }
            ]
        },
        {
            id: 'da-chapter-3',
            title: 'Level 3: Data Visualization',
            lessons: [
                { id: 'da-3-1', title: 'Introduction to Matplotlib' },
                { id: 'da-3-2', title: 'Creating Bar Charts and Histograms' },
                { id: 'da-3-3', title: 'Creating Line Plots and Scatter Plots' },
                { id: 'da-3-4', title: 'Advanced Visualization with Seaborn' }
            ]
        },
        {
            id: 'da-chapter-4',
            title: 'Level 4: Real-World Applications',
            lessons: [
                { id: 'da-4-1', title: 'Fetching Data from Public APIs' },
                { id: 'da-4-2', title: 'Case Study: Analyzing Weather Data' },
                { id: 'da-4-3', title: 'Case Study: Exploring Movie Datasets' }
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
