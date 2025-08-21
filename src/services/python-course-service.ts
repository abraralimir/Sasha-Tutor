// In a real application, this data would likely come from a database or a CMS.
// For this prototype, we'll keep it in a local file.

export interface Lesson {
    id: string;
    title: string;
    content: string; // Markdown content
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
    id: 'sashas-python-path',
    title: 'Sasha\'s Python Path',
    chapters: [
        {
            id: 'chapter-1',
            title: 'Introduction to Python',
            lessons: [
                {
                    id: 'lesson-1-1',
                    title: 'What is Python?',
                    content: `
# What is Python?

Welcome to your first step into the world of programming! You've chosen to start with Python, which is an excellent choice.

## A High-Level Language

Python is a **high-level, interpreted, interactive and object-oriented scripting language**. Don't worry if these terms sound complicated. Let's break them down:

- **High-level:** This means Python is closer to human language than it is to machine language (like binary code). It's designed to be easy to read and write. You write code that looks a bit like English, and the computer figures out the rest.

- **Interpreted:** Python code is processed at runtime by an interpreter. You don't need to compile your program before executing it. This is different from languages like C++ or Java. It makes the development process faster and more flexible.

- **Interactive:** You can actually "talk" to the Python interpreter directly to write your programs. This is great for testing small snippets of code and experimenting.

- **Object-Oriented:** Python supports a way of programming that lets you structure your code around "objects," which can contain both data and functions. This helps in creating complex applications in a clear and organized way.

## Why is Python so popular?

Python is one of the most popular programming languages in the world for several reasons:

1.  **Easy to Learn:** Its simple, clean syntax makes it an ideal language for beginners.
2.  **Versatile:** You can use Python for almost anything!
    *   Web development (like Django and Flask)
    *   Data science and machine learning (with libraries like Pandas, NumPy, and TensorFlow)
    *   Automation and scripting
    *   Software testing
    *   And much more!
3.  **Huge Community:** There's a massive global community of Python developers. This means you can find a lot of tutorials, libraries, and support online.

## Your First Python Code

Traditionally, the first program you write in a new language is one that prints "Hello, World!" to the screen. In Python, this is incredibly simple.

\`\`\`python
print("Hello, World!")
\`\`\`

That's it! Just one line. We'll dive into what this line does in the next lesson. Get ready to start coding!
`
                },
                {
                    id: 'lesson-1-2',
                    title: 'Setting Up Your Environment',
                    content: `
# Setting Up Your Environment

Before you can run Python code on your computer, you need to have the Python interpreter installed. Think of the interpreter as the program that understands and executes your Python code.

## Installing Python

Most non-Windows operating systems, like macOS and Linux, come with Python pre-installed. However, it might be an older version. It's always a good idea to install the latest version.

You can download the latest version of Python from the official website: [python.org](https://python.org).

The website provides installers for Windows, macOS, and source code for Linux users. The installation is straightforward, just like any other software.

**Important:** During installation on Windows, make sure to check the box that says **"Add Python to PATH"**. This will make it much easier to run Python from the command line.

## Verifying the Installation

Once installed, you can check if everything is working correctly. Open your command line or terminal:

-   On **Windows**, search for "Command Prompt" or "PowerShell".
-   On **macOS**, open the "Terminal" app.
-   On **Linux**, you likely already know how to open a terminal.

Type the following command and press Enter:

\`\`\`bash
python --version
\`\`\`
Or, depending on your system, you might need to use:
\`\`\`bash
python3 --version
\`\`\`

If Python is installed correctly, you should see something like \`Python 3.12.3\`, indicating the version number.

## The Python Interactive Shell

One of the best ways to learn Python is by using its interactive shell. This is a command-line session where you can type Python code and see the results immediately.

To start the interactive shell, just type \`python\` or \`python3\` in your terminal and press Enter.

You'll see a prompt that looks like this: \`>>>\`.

Now you can type Python code directly. Try it out!

\`\`\`python
2 + 2
\`\`\`

Press Enter, and the shell will respond with:

\`\`\`
4
\`\`\`

Congratulations! You've just run your first piece of Python code. To exit the interactive shell, you can type \`exit()\` and press Enter, or press \`Ctrl+D\`.
`
                }
            ]
        },
        {
            id: 'chapter-2',
            title: 'Python Basics',
            lessons: [
                {
                    id: 'lesson-2-1',
                    title: 'Hello, World!',
                    content: `
# Your First Program: Hello, World!

It's a tradition in the programming world to start with a program that displays "Hello, World!" on the screen. This simple task confirms that your setup is working and you understand the basic syntax for output.

## The \`print()\` function

In Python, displaying output is done with the built-in \`print()\` function. A **function** is a reusable block of code that performs a specific action. The \`print()\` function's action is to display things on the screen.

Here is the code:

\`\`\`python
print("Hello, World!")
\`\`\`

Let's break it down:
- \`print\`: This is the name of the function.
- \`(...)\`: The parentheses are used to pass information to the function. The information inside is called an **argument**.
- \`"Hello, World!"\`: This is the argument we are passing to the \`print()\` function. It's a piece of text, which in programming is called a **string**. Strings are always enclosed in quotes (either single \`'\` or double \`"\`).

When this line of code is executed, the \`print()\` function takes the string "Hello, World!" and displays it in the console.

## How to run this code

1.  **In the interactive shell:** You can type \`print("Hello, World!")\` directly into the Python interactive shell (\`>>>\`) and press Enter.
2.  **From a file:**
    *   Open a plain text editor (like Notepad, VS Code, or Sublime Text).
    *   Type the line \`print("Hello, World!")\`.
    *   Save the file with a \`.py\` extension, for example, \`hello.py\`.
    *   Open your terminal, navigate to the directory where you saved the file, and run the command: \`python hello.py\` (or \`python3 hello.py\`).

You should see \`Hello, World!\` printed to your terminal.

## Experiment!

Try changing the string inside the \`print()\` function.

\`\`\`python
print("My name is Sasha!")
print("Python is fun.")
\`\`\`

Each \`print()\` statement will output its content on a new line. This is the fundamental way to see the results of your code and provide information to the user.
`
                }
            ]
        }
    ]
};

export function getCourse(): Course {
    return pythonCourse;
}
