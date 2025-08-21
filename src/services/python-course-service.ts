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
                },
                {
                    id: 'lesson-2-2',
                    title: 'Variables & Data Types',
                    content: `
# Variables and Data Types

In programming, we need to store information. A **variable** is like a container or a labeled box where you can store a value.

## Creating Variables

Creating a variable in Python is simple. You just need to choose a name and use the assignment operator (\`=\`) to give it a value.

\`\`\`python
# A variable named 'name' that stores a string
name = "Sasha"

# A variable named 'age' that stores an integer
age = 25

# A variable named 'pi' that stores a floating-point number
pi = 3.14
\`\`\`

You can then use the variable's name to access its value.

\`\`\`python
print(name)
print(age)
\`\`\`

## Naming Rules

Variable names must follow a few rules:
- They can only contain letters (a-z, A-Z), numbers (0-9), and the underscore character (\_).
- They cannot start with a number.
- They are case-sensitive (\`age\` is different from \`Age\`).

It's a convention in Python to use \`snake_case\` for variable names (all lowercase with underscores between words). For example: \`user_first_name\`.

## Common Data Types

Every value in Python has a type. Here are some of the most common ones:

- **String (\`str\`)**: Text, enclosed in quotes. Example: \`"Hello, Python"\`.
- **Integer (\`int\`)**: Whole numbers, without a fractional part. Example: \`10\`, \`-5\`.
- **Float (\`float\`)**: Numbers with a decimal point. Example: \`3.14\`, \`-0.001\`.
- **Boolean (\`bool\`)**: Represents truth values. Can only be \`True\` or \`False\`.

You can find out the type of a variable using the \`type()\` function.

\`\`\`python
greeting = "Hi there"
year = 2024
is_learning = True

print(type(greeting))
print(type(year))
print(type(is_learning))
\`\`\`
`
                }
            ]
        },
        {
            id: 'chapter-3',
            title: 'Data Structures',
            lessons: [
                {
                    id: 'lesson-3-1',
                    title: 'Lists',
                    content: `
# Data Structures: Lists

Often, you'll want to store a collection of items, not just a single value. A **list** is a fundamental data structure in Python that allows you to store an ordered sequence of items.

## Creating a List

You create a list by placing items inside square brackets \`[]\`, separated by commas.

\`\`\`python
# A list of numbers
numbers = [1, 2, 3, 4, 5]

# A list of strings
fruits = ["apple", "banana", "cherry"]

# A list with mixed data types
mixed_list = ["hello", 100, True, 3.14]

# An empty list
empty_list = []
\`\`\`

## Accessing Elements

List items are indexed, and the first item has index \`[0]\`. You can access an item by referring to its index number.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Get the first item
print(fruits[0])  # Output: apple

# Get the third item
print(fruits[2])  # Output: cherry
\`\`\`

You can also use negative indexing to start from the end. \`-1\` refers to the last item.

\`\`\`python
# Get the last item
print(fruits[-1]) # Output: cherry
\`\`\`

## Modifying Lists

Lists are **mutable**, which means you can change their content.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Change an item
fruits[1] = "blackberry"
print(fruits) # Output: ['apple', 'blackberry', 'cherry']

# Add an item to the end
fruits.append("orange")
print(fruits) # Output: ['apple', 'blackberry', 'cherry', 'orange']

# Remove an item
fruits.remove("apple")
print(fruits) # Output: ['blackberry', 'cherry', 'orange']
\`\`\`
`
                },
                {
                    id: 'lesson-3-2',
                    title: 'Dictionaries',
                    content: `
# Data Structures: Dictionaries

A **dictionary** is a collection which is unordered, changeable and indexed. In Python dictionaries are written with curly brackets \`{}\`, and they have keys and values.

It's a powerful way to store data in a \`key: value\` pair format. Think of it like a real-world dictionary where you look up a word (the key) to find its definition (the value).

## Creating a Dictionary

\`\`\`python
# A simple dictionary
student = {
  "name": "Sasha",
  "course": "Python Path",
  "year": 2024
}

print(student)
\`\`\`

## Accessing Items

You can access the items of a dictionary by referring to its key name, inside square brackets.

\`\`\`python
# Get the value of the "name" key
x = student["name"]
print(x) # Output: Sasha
\`\`\`

There is also a method called \`get()\` that will give you the same result.

\`\`\`python
x = student.get("course")
print(x) # Output: Python Path
\`\`\`

## Modifying Dictionaries

You can change the value of a specific item by referring to its key name.

\`\`\`python
student = {
  "name": "Sasha",
  "course": "Python Path",
  "year": 2024
}

# Change the year
student["year"] = 2025
print(student)

# Add a new key-value pair
student["is_enrolled"] = True
print(student)

# Remove a key-value pair
student.pop("course")
print(student)
\`\`\`
`
                }
            ]
        },
        {
            id: 'chapter-4',
            title: 'Control Flow',
            lessons: [
                {
                    id: 'lesson-4-1',
                    title: 'Conditional Statements',
                    content: `
# Control Flow: Conditional Statements

So far, our code has executed line by line, from top to bottom. But what if we want to run certain code only if a specific condition is met? This is where conditional statements come in.

The most common conditional statements are \`if\`, \`elif\` (else if), and \`else\`.

## The \`if\` Statement

The \`if\` statement is used to execute a block of code only when its condition is \`True\`.

\`\`\`python
age = 20

if age >= 18:
  print("You are an adult.")
\`\`\`

Notice the colon \`:\` at the end of the \`if\` line and the **indentation** of the \`print\` statement. Indentation is very important in Python; it's how Python knows which code belongs to the \`if\` block.

## The \`else\` Statement

The \`else\` keyword catches anything which isn't caught by the preceding conditions. It executes a block of code when the \`if\` condition is \`False\`.

\`\`\`python
age = 15

if age >= 18:
  print("You are an adult.")
else:
  print("You are a minor.")
\`\`\`

## The \`elif\` Statement

The \`elif\` keyword is Python's way of saying "if the previous conditions were not true, then try this condition". It allows you to check for multiple conditions.

\`\`\`python
score = 85

if score >= 90:
  print("Grade: A")
elif score >= 80:
  print("Grade: B")
elif score >= 70:
  print("Grade: C")
else:
  print("Grade: F")
\`\`\`
In this example, since \`score\` is 85, the first condition (\`>= 90\`) is false. The program then checks the first \`elif\` condition (\`>= 80\`), which is true, so it prints "Grade: B" and stops.
`
                },
                {
                    id: 'lesson-4-2',
                    title: 'Loops',
                    content: `
# Control Flow: Loops

Loops are a fundamental concept in programming that allow you to execute a block of code repeatedly. Python has two primary loop types: \`for\` loops and \`while\` loops.

## The \`for\` Loop

A \`for\` loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string). This is less like the \`for\` keyword in other programming languages, and works more like an iterator method as found in other object-orientated programming languages.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
  print(fruit)
\`\`\`
This loop will go through the \`fruits\` list one item at a time. In each iteration, the current item is assigned to the variable \`fruit\`, and the code inside the loop (\`print(fruit)\`) is executed.

You can also loop through a string:
\`\`\`python
for letter in "Python":
  print(letter)
\`\`\`

## The \`while\` Loop

With the \`while\` loop we can execute a set of statements as long as a condition is true.

\`\`\`python
# A loop that counts from 1 to 5
count = 1
while count <= 5:
  print(count)
  count = count + 1 # Increment the counter
\`\`\`
It's crucial to have a line that eventually makes the condition \`False\` (like \`count = count + 1\`), otherwise the loop will run forever! This is called an **infinite loop**.
`
                }
            ]
        }
    ]
};

export function getCourse(): Course {
    return pythonCourse;
}
