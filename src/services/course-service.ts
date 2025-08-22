
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
                {
                    id: 'lesson-1-2',
                    title: 'Variables & Data Types',
                    content: `
<h1>Storing Information: Variables</h1>
<p>Imagine you have a piece of information you want to use later, like a name or a number. In programming, you store this information in a <strong>variable</strong>. Think of a variable as a labeled box where you can put data.</p>
<h2>Creating a Variable</h2>
<p>Creating a variable in Python is simple. You just choose a name, use the equals sign (<code>=</code>), and give it a value.</p>
<code>name = "Sasha"</code><br/>
<code>age = 10</code>
<p>Here, we've created two variables. <code>name</code> holds the text "Sasha", and <code>age</code> holds the number 10.</p>
<h2>Common Data Types</h2>
<p>Data comes in different types. Python is smart and usually figures out the type on its own.</p>
<ul>
    <li><strong>String (str):</strong> Plain text, always wrapped in quotes. E.g., <code>"Hello, Python!"</code></li>
    <li><strong>Integer (int):</strong> Whole numbers. E.g., <code>42</code>, <code>-100</code></li>
    <li><strong>Float (float):</strong> Numbers with decimal points. E.g., <code>3.14</code>, <code>-0.5</code></li>
    <li><strong>Boolean (bool):</strong> Represents truth values, either <code>True</code> or <code>False</code>.</li>
</ul>
<p>You can see a variable's type using the <code>type()</code> function.</p>
<interactive-code-cell description="Create a variable named 'score' and assign it the integer value 100." expected="score = 100" />
                    `,
                    quiz: [
                        {
                            question: "What is the correct way to assign the text 'Python' to a variable named 'language'?",
                            options: ["language = Python", "language = \"Python\"", "let language = \"Python\"", "string language = \"Python\""],
                            correctAnswer: "language = \"Python\""
                        },
                        {
                            question: "Which data type would you use to store a person's age as a whole number?",
                            options: ["Float", "String", "Boolean", "Integer"],
                            correctAnswer: "Integer"
                        }
                    ]
                },
                {
                    id: 'lesson-1-3',
                    title: 'Numbers & Math Operations',
                    content: `
<h1>Working with Numbers</h1>
<p>Python is also a powerful calculator. You can perform all the standard mathematical operations directly in your code.</p>
<h2>Basic Arithmetic</h2>
<p>The symbols for basic math are straightforward:</p>
<ul>
    <li><code>+</code> for Addition</li>
    <li><code>-</code> for Subtraction</li>
    <li><code>*</code> for Multiplication</li>
    <li><code>/</code> for Division</li>
</ul>
<p>For example, to calculate <code>5 + 7</code> and store it in a result, you would write:</p>
<code>result = 5 + 7</code>
<p>The variable <code>result</code> would now hold the value <code>12</code>.</p>
<h2>Order of Operations</h2>
<p>Python follows the standard order of operations (PEMDAS/BODMAS). Parentheses <code>()</code> are evaluated first, then Exponents, then Multiplication/Division, and finally Addition/Subtraction.</p>
<code>calculation = (5 + 3) * 2  # This equals 16, not 11</code>
<h2>More Operations</h2>
<ul>
    <li><code>**</code> for Exponent (e.g., <code>2 ** 3</code> is 2 to the power of 3, which is 8)</li>
    <li><code>%</code> for Modulo (returns the remainder of a division, e.g., <code>10 % 3</code> is 1)</li>
</ul>
<interactive-code-cell description="Write code to calculate 20 divided by 4 and store it in a variable named 'answer'." expected="answer = 20 / 4" />
                    `,
                    quiz: [
                        {
                            question: "What is the result of the expression `2 * 3` in Python?",
                            options: ["8", "6", "5", "9"],
                            correctAnswer: "8"
                        },
                        {
                            question: "What does the modulo operator (`%`) do?",
                            options: ["Calculates the percentage", "Finds the remainder of a division", "Performs multiplication", "Rounds a number"],
                            correctAnswer: "Finds the remainder of a division"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-2',
            title: 'Level 2: Control Flow',
            lessons: [
                {
                    id: 'lesson-2-1',
                    title: 'if, elif, else Statements',
                    content: `
<h1>Making Decisions in Code</h1>
<p>So far, our code has run from top to bottom. But what if we want to run certain code only if a condition is true? We use <strong>conditional statements</strong>.</p>
<h2>The <code>if</code> Statement</h2>
<p>The <code>if</code> statement is the most basic decision-making tool. It checks if a condition is true, and if it is, it executes a block of code.</p>
<code>temperature = 30
if temperature > 25:
    print("It's a hot day!")
</code>
<p>Notice the colon <code>:</code> and the indentation. The indented code only runs if the condition <code>temperature > 25</code> is <code>True</code>.</p>
<h2>The <code>else</code> Statement</h2>
<p>What if the condition is false? You can use an <code>else</code> statement to provide an alternative block of code to run.</p>
<code>if temperature > 25:
    print("It's a hot day!")
else:
    print("It's not a hot day.")
</code>
<h2>The <code>elif</code> Statement</h2>
<p>If you have more than two possibilities, you can use <code>elif</code> (short for "else if") to check for other conditions.</p>
<code>score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C or below")
</code>
<interactive-code-cell description="Write an if statement to print 'Positive' if the variable 'num' is greater than 0." expected="if num > 0: print('Positive')" />
                    `,
                    quiz: [
                        {
                            question: "Which keyword is used to handle the case where the `if` condition is false?",
                            options: ["otherwise", "maybe", "elif", "else"],
                            correctAnswer: "else"
                        },
                        {
                            question: "What is required after the condition in an `if` statement and at the start of the code block that follows?",
                            options: ["A semicolon and curly braces", "A colon and indentation", "A period and tabs", "Parentheses and quotes"],
                            correctAnswer: "A colon and indentation"
                        }
                    ]
                },
                {
                    id: 'lesson-2-2',
                    title: 'for Loops',
                    content: `
<h1>Repeating Actions: The 'for' Loop</h1>
<p>A loop is a way to repeat a block of code multiple times. The <code>for</code> loop in Python is used to iterate over a sequence (like a list, a tuple, a dictionary, a set, or a string).</p>
<h2>Looping Through a List</h2>
<p>This is the most common use of a <code>for</code> loop. You can perform an action for each item in the list.</p>
<code>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
</code>
<p>This code will print "apple", then "banana", then "cherry", each on a new line.</p>
<h2>The <code>range()</code> Function</h2>
<p>If you want to run a loop a specific number of times, you can use the <code>range()</code> function.</p>
<code>for i in range(5):
    print("Hello!")
</code>
<p>This will print "Hello!" five times. The variable <code>i</code> will take on the values 0, 1, 2, 3, and 4 in each iteration.</p>
<interactive-code-cell description="Write a for loop to print the numbers from 0 to 2 using range()." expected="for i in range(3): print(i)" />
                    `,
                    quiz: [
                        {
                            question: "What does the `range(3)` function generate?",
                            options: ["The numbers 1, 2, 3", "The numbers 0, 1, 2", "The number 3", "The numbers 0, 1, 2, 3"],
                            correctAnswer: "The numbers 0, 1, 2"
                        },
                        {
                            question: "What is a `for` loop typically used for?",
                            options: ["Making a single decision", "Storing a single value", "Iterating over a sequence of items", "Ending the program"],
                            correctAnswer: "Iterating over a sequence of items"
                        }
                    ]
                }
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
                {
                    id: 'excel-1-2',
                    title: 'Entering and Formatting Data',
                    content: `
<h1>Data Entry and Formatting</h1>
<p>Entering data in Excel is as simple as clicking on a cell and typing. But making that data look good and easy to read is a key skill.</p>
<h2>Entering Different Data Types</h2>
<ul>
    <li><strong>Text:</strong> Simply type text into a cell. By default, it aligns to the left.</li>
    <li><strong>Numbers:</strong> Type numbers into a cell. By default, they align to the right.</li>
    <li><strong>Dates:</strong> Excel is very smart about dates. You can type "10/15/2024" or "15-Oct-24" and Excel will recognize it as a date.</li>
</ul>
<h2>Formatting Cells</h2>
<p>The 'Home' tab on the Ribbon contains most of the formatting tools you'll need. You can change:</p>
<ul>
    <li><strong>Font:</strong> Change the font type, size, color, and make it bold, italic, or underlined.</li>
    <li><strong>Alignment:</strong> Change how data is aligned within a cell (left, right, center, top, bottom).</li>
    <li><strong>Number Formatting:</strong> This is very powerful. You can format numbers as currency ($), percentages (%), dates, and more.</li>
</ul>
<interactive-code-cell description="To format a cell as US currency, you would select the cell and click which symbol on the Home tab?" expected="The dollar sign ($)" />
                    `,
                    quiz: [
                        {
                            question: "By default, how does Excel align text data in a cell?",
                            options: ["Center", "Right", "Left", "Justify"],
                            correctAnswer: "Left"
                        },
                        {
                            question: "Which tab on the Ribbon holds the main tools for changing font color and cell alignment?",
                            options: ["Insert", "Data", "View", "Home"],
                            correctAnswer: "Home"
                        }
                    ]
                }
            ]
        },
        {
            id: 'excel-chapter-2',
            title: 'Level 2: Intermediate Formulas',
            lessons: [
                {
                    id: 'excel-2-1',
                    title: 'Logical Functions (IF, AND, OR)',
                    content: `
<h1>Making Decisions with IF</h1>
<p>The <code>IF</code> function is one of the most powerful and widely used functions in Excel. It allows you to perform a logical comparison between a value and what you expect, and returns one value if the result is true, and another if it's false.</p>
<h2>Structure of the IF Function</h2>
<p>The syntax is: <code>=IF(logical_test, value_if_true, value_if_false)</code></p>
<ul>
    <li><strong>logical_test:</strong> The condition you want to check. For example, <code>A1 > 10</code>.</li>
    <li><strong>value_if_true:</strong> What to display if the condition is true.</li>
    <li><strong>value_if_false:</strong> What to display if the condition is false.</li>
</ul>
<p>For example, if cell A1 contains a student's score, you could write: <code>=IF(A1>=60, "Pass", "Fail")</code></p>
<interactive-code-cell description="Write an IF function that checks if cell B2 is equal to 'Yes' and returns 100 if true, and 0 if false." expected="=IF(B2=\"Yes\", 100, 0)" />
                    `,
                    quiz: [
                        {
                            question: "How many arguments does the IF function take?",
                            options: ["1", "2", "3", "4"],
                            correctAnswer: "3"
                        },
                        {
                            question: "In the formula `=IF(C1<10, 'Under', 'Over')`, what is the result if cell C1 contains the value 5?",
                            options: ["Over", "Under", "Error", "10"],
                            correctAnswer: "Under"
                        }
                    ]
                }
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
<interactive-code-cell description="The SAP module for external financial reporting is called what?" expected="FI (Financial Accounting)" />
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
                {
                    id: 'sap-fico-1-2',
                    title: 'Overview of SAP Modules',
                    content: `
<h1>A World of Modules</h1>
<p>SAP is vast. It's designed to run entire businesses, so it's broken down into functional <strong>modules</strong>. While FICO is our focus, it's important to know about the other key modules it integrates with.</p>
<h2>Core SAP Modules</h2>
<ul>
    <li><strong>SD (Sales and Distribution):</strong> Manages the entire sales process, from orders and pricing to shipping and billing. When a sale is made in SD, it automatically creates a posting in FI.</li>
    <li><strong>MM (Materials Management):</strong> Handles procurement and inventory. When a company buys raw materials using MM, it triggers a financial posting in FI (Accounts Payable).</li>
    <li><strong>PP (Production Planning):</strong> Manages the manufacturing process. The costs of production are tracked and settled in CO.</li>
    <li><strong>HCM (Human Capital Management):</strong> The HR module. Manages payroll, hiring, etc. Payroll runs in HCM post directly to FI.</li>
</ul>
<p>This integration is the magic of SAP. An action in one part of the business has an immediate and automatic impact on the financial records, ensuring everything is always in sync.</p>
<interactive-code-cell description="Which module handles the purchasing of materials and inventory?" expected="MM (Materials Management)" />
                    `,
                    quiz: [
                        {
                            question: "Which two modules are most tightly integrated with FI for sales and procurement processes?",
                            options: ["PP and HCM", "SD and MM", "HCM and SD", "MM and PP"],
                            correctAnswer: "SD and MM"
                        },
                        {
                            question: "What is the key benefit of SAP's integrated module system?",
                            options: ["Each department is separate", "It makes the software more complex", "Actions in one module automatically update others, like FI", "It's only for the HR department"],
                            correctAnswer: "Actions in one module automatically update others, like FI"
                        }
                    ]
                }
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
<interactive-code-cell description="What is the term for the cloud benefit that lets you scale resources up and down as needed?" expected="Elasticity" />
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
                {
                    id: 'cloud-1-2',
                    title: 'Cloud Service Models (IaaS, PaaS, SaaS)',
                    content: `
<h1>The 'As-A-Service' Models</h1>
<p>Cloud computing services are often categorized into three main models. They represent different levels of management and control over your IT resources.</p>
<h2>IaaS: Infrastructure as a Service</h2>
<p>This is the most basic category. You are essentially renting IT infrastructure—servers, virtual machines, storage, networks—from a cloud provider. You have the most control but also the most responsibility to manage the operating system and applications.</p>
<p><strong>Analogy:</strong> Renting a plot of land. You get the land, but you have to build the house yourself.</p>
<h2>PaaS: Platform as a Service</h2>
<p>This model provides an on-demand environment for developing, testing, delivering, and managing software applications. PaaS makes it easier for developers to quickly create web or mobile apps, without worrying about setting up or managing the underlying infrastructure.</p>
<p><strong>Analogy:</strong> Renting a house. The foundation, walls, and utilities are ready, but you furnish it.</p>
<h2>SaaS: Software as a Service</h2>
<p>This is a method for delivering software applications over the Internet, on demand and typically on a subscription basis. You don't manage the software or the infrastructure; you just use it. Examples include Gmail, Salesforce, and Dropbox.</p>
<p><strong>Analogy:</strong> Renting a fully furnished apartment. You just move in and use it.</p>
<interactive-code-cell description="Which service model gives you the most control over the infrastructure?" expected="IaaS" />
                    `,
                    quiz: [
                        {
                            question: "Which cloud service model does Gmail or Microsoft 365 represent?",
                            options: ["IaaS", "PaaS", "SaaS", "On-premise"],
                            correctAnswer: "SaaS"
                        },
                        {
                            question: "If you want to build and deploy a web application without managing the underlying servers, which model is the best fit?",
                            options: ["PaaS", "IaaS", "SaaS", "Bare Metal"],
                            correctAnswer: "PaaS"
                        }
                    ]
                }
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
<interactive-code-cell description="Which step of the data analytics process involves cleaning and formatting the data?" expected="Prepare" />
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
                {
                    id: 'da-1-2',
                    title: 'Introduction to Pandas',
                    content: `
<h1>Pandas: Your Data Superhero</h1>
<p>Pandas is the most popular Python library for data manipulation and analysis. It provides data structures and functions needed to work with structured data seamlessly.</p>
<h2>The DataFrame</h2>
<p>The core of Pandas is the <strong>DataFrame</strong>, a two-dimensional table of data with rows and columns, similar to a spreadsheet. You can create a DataFrame from many sources, like dictionaries, lists, or by reading a file.</p>
<h2>Reading Data</h2>
<p>A common task is to read data from a CSV (Comma-Separated Values) file into a DataFrame. Pandas makes this incredibly easy with the <code>read_csv()</code> function.</p>
<code>import pandas as pd
df = pd.read_csv('my_data.csv')
</code>
<h2>Inspecting Your Data</h2>
<p>Once you have a DataFrame, you'll want to inspect it. Here are two essential commands:</p>
<ul>
    <li><code>df.head()</code>: Shows the first 5 rows of your data.</li>
    <li><code>df.info()</code>: Provides a summary of the DataFrame, including data types and non-null values.</li>
</ul>
<interactive-code-cell description="Write the pandas command to view the first 5 rows of a DataFrame named 'sales_df'." expected="sales_df.head()" />
                    `,
                    quiz: [
                        {
                            question: "What is the primary data structure used in the Pandas library?",
                            options: ["List", "Array", "Dictionary", "DataFrame"],
                            correctAnswer: "DataFrame"
                        },
                        {
                            question: "Which Pandas function is used to read data from a CSV file?",
                            options: ["open_csv()", "load_csv()", "read_csv()", "import_csv()"],
                            correctAnswer: "read_csv()"
                        }
                    ]
                }
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
