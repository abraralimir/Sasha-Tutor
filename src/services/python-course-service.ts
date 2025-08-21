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
    id: 'sashas-python-path',
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
# Introduction to Python & Setup

Welcome to the world of Python! Python is a versatile, high-level programming language known for its readability and simplicity.

## Why Python?
- **Easy to Learn**: Clean syntax makes it great for beginners.
- **Versatile**: Used in web development, data science, AI, automation, and more.
- **Large Community**: Extensive libraries and a supportive community.

## Setup
To get started, you need to install Python.
1.  Go to the official [python.org](https://python.org) website.
2.  Download the latest version for your operating system.
3.  Run the installer. On Windows, make sure to check the box that says **"Add Python to PATH"**.

To verify your installation, open a terminal or command prompt and type:
<code>python --version</code>
You should see the installed Python version, like \`Python 3.12.3\`.
`
                },
                {
                    id: 'lesson-1-2',
                    title: 'Python Syntax & First Program',
                    content: `
# Python Syntax & First Program (Hello, World!)

Python was designed for readability. It has a simple syntax similar to the English language.

## Your First Program
The traditional first program is "Hello, World!". In Python, it's just one line. The \`print()\` function is a built-in function that outputs text to the console. The text inside the parentheses, \`"Hello, World!"\`, is called a string.

Now you try! Type the "Hello, World!" program in the box below and run it.
<interactive-code-cell description="Write a Python program to print 'Hello, World!'." expected="print(\"Hello, World!\")" />

## Indentation
Python uses indentation (whitespace at the beginning of a line) to define scope, like loops, functions, and classes. Other languages often use curly brackets for this purpose.
<code>if 5 > 2:
  print("Five is greater than two!") # This line is indented</code>
The amount of indentation is up to you, but it must be consistent. The standard is four spaces.
`
                },
                {
                    id: 'lesson-1-3',
                    title: 'Comments & Code Structure',
                    content: `
# Comments & Code Structure

Comments can be used to explain Python code, make it more readable, and prevent execution when testing.

## Single-line Comments
Comments start with a \`#\`, and Python will ignore the rest of the line.

<interactive-code-cell description="Add a comment above the print statement that says 'This prints a message'." expected="# This prints a message" />
<code># This is a comment
print("Hello, World!")</code>

## Multi-line Comments
Python does not have a specific syntax for multi-line comments. To add them, you can either use \`#\` for each line or use a multi-line string (triple quotes), which Python will ignore if it's not assigned to a variable.
<code>"""
This is a multi-line comment
or rather a multi-line string literal
that can be used as one.
"""
print("Comments are useful!")</code>
`
                },
                {
                    id: 'lesson-1-4',
                    title: 'Variables & Data Types',
                    content: `
# Variables & Data Types

A variable is a container for storing a value.

## Creating Variables
Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.

<interactive-code-cell description="Create a variable named 'name' and assign it the string value 'Sasha'." expected="name = \"Sasha\"" />

## Common Data Types
- **String (\`str\`)**: \`"Hello"\`
- **Integer (\`int\`)**: \`10\`, \`-5\`
- **Float (\`float\`)**: \`3.14\`, \`2.5\`
- **Boolean (\`bool\`)**: \`True\`, \`False\`

You can get the data type of any object by using the \`type()\` function.
<code>x = 5
print(type(x)) # Output: <class 'int'></code>
`
                },
                {
                    id: 'lesson-1-5',
                    title: 'Numbers & Math Operations',
                    content: `
# Numbers & Math Operations

Python has various types of numbers. We will mainly focus on integers (\`int\`) and floating-point numbers (\`float\`).

You can perform all standard mathematical operations.

<interactive-code-cell description="Add the numbers 10 and 5 together and print the result." expected="print(10 + 5)" />
<code>x = 10
y = 3

# Addition
print(x + y) # Output: 13

# Subtraction
print(x - y) # Output: 7

# Multiplication
print(x * y) # Output: 30

# Division
print(x / y) # Output: 3.333...

# Floor Division (discards the fractional part)
print(x // y) # Output: 3

# Modulus (returns the remainder)
print(x % y) # Output: 1

# Exponentiation (x to the power of y)
print(x ** y) # Output: 1000</code>
`
                },
                {
                    id: 'lesson-1-6',
                    title: 'Strings & String Operations',
                    content: `
# Strings & String Operations

Strings in python are surrounded by either single quotation marks, or double quotation marks.

<interactive-code-cell description="Use an f-string to print 'Hello, Sasha'. You will need to create a name variable first." expected="name = 'Sasha'; print(f'Hello, {name}')" />

## Basic Operations
<code># Concatenation (joining strings)
first_name = "Sasha"
last_name = "Codes"
full_name = first_name + " " + last_name
print(full_name) # Output: Sasha Codes

# String formatting (f-strings)
greeting = f"Hello, my name is {first_name}."
print(greeting) # Output: Hello, my name is Sasha.

# String length
print(len(full_name)) # Output: 11

# Accessing characters
print(first_name[0]) # Output: S</code>

## Common String Methods
<code>my_string = "  Hello Python!  "

# Remove whitespace from beginning or end
print(my_string.strip()) # Output: "Hello Python!"

# Convert to lowercase
print(my_string.lower()) # Output: "  hello python!  "

# Convert to uppercase
print(my_string.upper()) # Output: "  HELLO PYTHON!  "

# Replace a substring
print(my_string.strip().replace("Python", "World")) # Output: "Hello World!"</code>
`
                },
                {
                    id: 'lesson-1-7',
                    title: 'Booleans & Logical Operators',
                    content: `
# Booleans & Logical Operators

In programming you often need to know if an expression is **True** or **False**. These are the two boolean values.

<interactive-code-cell description="Check if 10 is greater than 5 and print the result." expected="print(10 > 5)" />

## Comparison Operators
<code>x = 10
y = 5

print(x > y)  # Output: True
print(x < y)  # Output: False
print(x == y) # Output: False (Note: == is for comparison, = is for assignment)
print(x != y) # Output: True (Not equal)</code>

## Logical Operators
Logical operators are used to combine conditional statements:
- **\`and\`**: Returns \`True\` if both statements are true.
- **\`or\`**: Returns \`True\` if one of the statements is true.
- **\`not\`**: Reverse the result, returns \`False\` if the result is true.
<code>age = 22
is_student = True

# and operator
if age > 18 and is_student:
  print("Eligible for student discount.")

# not operator
print(not (age > 18)) # Output: False</code>
`
                },
                {
                    id: 'lesson-1-8',
                    title: 'Type Conversion & Input/Output',
                    content: `
# Type Conversion & Input/Output

Sometimes you need to convert values from one type to another. This is called type casting.

<interactive-code-cell description="Convert the string '100' to an integer and print it." expected="print(int('100'))" />

## Type Conversion
<code>x = 10 # int
y = 3.14 # float
z = "25" # str

# Convert int to float
print(float(x)) # Output: 10.0

# Convert float to int (truncates)
print(int(y)) # Output: 3

# Convert string to int
age = int(z)
print(age * 2) # Output: 50</code>

## Getting User Input
The \`input()\` function allows you to get input from the user. It always returns the input as a string.
<code>name = input("Enter your name: ")
age_str = input("Enter your age: ")

# Convert age to integer to perform math
age_int = int(age_str)

print(f"Hello, {name}! You will be {age_int + 1} next year.")</code>
`
                },
                {
                    id: 'lesson-1-9',
                    title: 'Basic Error Handling (try/except)',
                    content: `
# Basic Error Handling (try/except)

When an error occurs in your program, it will normally stop and generate an error message. These errors can be handled using \`try...except\` blocks.

The \`try\` block lets you test a block of code for errors.
The \`except\` block lets you handle the error.
<interactive-code-cell description="This code will cause an error. Fix it using a try/except block to print 'Cannot divide by zero'." expected="try: print(5/0) except: print('Cannot divide by zero')" />

<code>try:
  age_str = input("Enter your age: ")
  age_int = int(age_str)
  print(f"Your age is {age_int}.")
except ValueError:
  print("Invalid input. Please enter a number.")</code>
If you run this code and enter text instead of a number, the program won't crash. Instead, it will execute the \`except\` block and print a user-friendly message.
`
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
# Control Flow: if, elif, else Statements

Conditional statements allow your program to make decisions and execute different code blocks based on certain conditions.

<interactive-code-cell description="Write an if statement to print 'Positive' if the variable 'x' is greater than 0." expected="x = 5; print('Positive') if x > 0 else print('Not Positive')" />

<code>temperature = 25

if temperature > 30:
  print("It's a hot day!")
elif temperature > 20: # You can have zero or more elif parts
  print("It's a pleasant day.")
else: # The else part is optional
  print("It's a cold day.")</code>
The code checks conditions from top to bottom. As soon as a \`True\` condition is found, its block is executed, and the rest of the \`if/elif/else\` structure is skipped.
`
                },
                {
                    id: 'lesson-2-2',
                    title: 'for Loops',
                    content: `
# Control Flow: for Loops

A \`for\` loop is used for iterating over a sequence (like a list, tuple, or string).

<interactive-code-cell description="Use a for loop and range() to print numbers from 0 to 2." expected="for i in range(3): print(i)" />

## Looping Through a List
<code>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print(f"I like {fruit}s.")</code>

## The range() Function
To loop through a set of code a specified number of times, we can use the \`range()\` function.
<code># Prints numbers from 0 to 4
for i in range(5):
  print(i)</code>
`
                },
                {
                    id: 'lesson-2-3',
                    title: 'while Loops',
                    content: `
# Control Flow: while Loops

A \`while\` loop executes a set of statements as long as a condition is true.

<interactive-code-cell description="Use a while loop to print numbers from 1 to 3." expected="i = 1; while i <= 3: print(i); i += 1" />
<code>count = 0
while count < 5:
  print(f"Count is {count}")
  count = count + 1 # It is crucial to increment count, otherwise the loop will continue forever.

print("Loop finished.")</code>
This loop will print the count from 0 to 4. When \`count\` becomes 5, the condition \`count < 5\` is no longer true, and the loop terminates.
`
                },
                {
                    id: 'lesson-2-4',
                    title: 'Loop Control (break, continue, pass)',
                    content: `
# Loop Control Statements

You can change the execution of a loop from its normal sequence.

- **\`break\`**: Terminates the loop entirely.
- **\`continue\`**: Skips the rest of the current iteration and proceeds to the next one.
- **\`pass\`**: A null statement, a placeholder for when a statement is required syntactically but no code needs to be executed.
<interactive-code-cell description="Write a loop that prints 0, 1, and 2, then stops using 'break'." expected="for i in range(5):
    if i == 3:
        break
    print(i)" />
<code># Example of break and continue
for i in range(10):
  if i == 3:
    continue # Skip printing 3
  if i == 7:
    break # Stop the loop when i is 7
  print(i)

# Example of pass
if 10 > 5:
    pass # We need something here, but don't want to do anything</code>
`
                },
                {
                    id: 'lesson-2-5',
                    title: 'List Comprehensions',
                    content: `
# List Comprehensions

List comprehensions provide a concise way to create lists.

<interactive-code-cell description="Use a list comprehension to create a list of numbers from 0 to 4." expected="[x for x in range(5)]" />

## Basic Syntax
A common use case is to make new lists where each element is the result of some operation applied to each member of another sequence.

<code># A traditional for loop to create a list of squares
squares = []
for x in range(10):
  squares.append(x**2)
print(squares)

# The same result using a list comprehension
squares_comp = [x**2 for x in range(10)]
print(squares_comp)</code>

## With a Condition
You can also add a condition to filter the elements.
<code># Get squares of even numbers only
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)</code>
`
                }
            ]
        },
		{
            id: 'chapter-3',
            title: 'Level 3: Data Structures',
            lessons: [
                {
                    id: 'lesson-3-1',
                    title: 'Lists',
                    content: `
# Data Structures: Lists

A list is a collection which is ordered and changeable. Allows duplicate members. In Python lists are written with square brackets.

<interactive-code-cell description="Create a list containing the strings 'apple' and 'banana'." expected="['apple', 'banana']" />
<code>my_list = ["apple", "banana", "cherry"]
print(my_list)

# Access items by index
print(my_list[1]) # Output: banana

# Change an item
my_list[0] = "orange"
print(my_list) # Output: ['orange', 'banana', 'cherry']

# Add an item
my_list.append("mango")
print(my_list)</code>
`
                },
                {
                    id: 'lesson-3-2',
                    title: 'Tuples',
                    content: `
# Data Structures: Tuples

A tuple is a collection which is ordered and **unchangeable**. In Python tuples are written with round brackets.

<interactive-code-cell description="Create a tuple containing the numbers 1 and 2." expected="(1, 2)" />
<code>my_tuple = ("apple", "banana", "cherry")
print(my_tuple)

# Access items by index
print(my_tuple[0]) # Output: apple

# You cannot change items in a tuple
# my_tuple[0] = "orange" # This will raise a TypeError</code>
Tuples are useful for data that should not be modified, like days of the week or coordinates.
`
                },
                {
                    id: 'lesson-3-3',
                    title: 'Sets',
                    content: `
# Data Structures: Sets

A set is a collection which is unordered and unindexed. No duplicate members. In Python sets are written with curly brackets.

<interactive-code-cell description="Create a set containing the numbers 1, 2, and 2. What do you expect the output to be?" expected="{1, 2}" />
<code>my_set = {"apple", "banana", "cherry", "apple"}
print(my_set) # Output: {'cherry', 'apple', 'banana'} (order may vary, 'apple' appears once)

# Add an item
my_set.add("orange")
print(my_set)

# Check if an item exists
print("banana" in my_set) # Output: True</code>
Sets are highly optimized for checking if a specific element is contained in the set.
`
                },
                {
                    id: 'lesson-3-4',
                    title: 'Dictionaries',
                    content: `
# Data Structures: Dictionaries

A dictionary is a collection which is ordered (as of Python 3.7), changeable and does not allow duplicate keys. Dictionaries are used to store data values in key:value pairs.

<interactive-code-cell description="Create a dictionary with key 'name' and value 'Sasha'." expected="{'name': 'Sasha'}" />
<code>my_dict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}
print(my_dict)

# Access items by key
print(my_dict["model"]) # Output: Mustang

# Change a value
my_dict["year"] = 2024
print(my_dict)

# Add a new item
my_dict["color"] = "red"
print(my_dict)</code>
`
                },
                {
                    id: 'lesson-3-5',
                    title: 'Nested Data Structures',
                    content: `
# Nested Data Structures

You can have data structures inside other data structures. For example, a list of dictionaries.
<interactive-code-cell description="Create a list with one dictionary inside. The dictionary should have a key 'city' with the value 'New York'." expected="[{'city': 'New York'}]" />
<code># A list of students, where each student is a dictionary
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78}
]

# Accessing nested data
print(students[0]["name"]) # Output: Alice

# Looping through nested data
for student in students:
    print(f"{student['name']} scored {student['grade']}.")</code>
Nesting allows you to model complex, real-world data.
`
                }
            ]
        },
        {
            id: 'chapter-4',
            title: 'Level 4: Functions & Modules',
            lessons: [
                 {
                    id: 'lesson-4-1',
                    title: 'Defining & Calling Functions',
                    content: `
# Functions & Modules: Defining & Calling Functions

A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.

<interactive-code-cell description="Define a function 'my_func' that prints 'Hi'." expected="def my_func(): print('Hi')" />
<code># Define a function
def greet():
  print("Hello from a function!")

# Call the function
greet()

# A function with a parameter
def greet_name(name):
  print(f"Hello, {name}!")

greet_name("Alice")
greet_name("Bob")</code>
Functions help break our program into smaller and modular chunks.
`
                },
                {
                    id: 'lesson-4-2',
                    title: 'Function Arguments (*args, **kwargs)',
                    content: `
# Function Arguments: *args and **kwargs

Sometimes, you might need to pass a variable number of arguments to a function.

## *args (Non-Keyword Arguments)
\`*args\` allows you to pass a variable number of positional arguments. They are received as a tuple.
<code>def sum_all(*args):
  total = 0
  for num in args:
    total += num
  return total

print(sum_all(1, 2, 3)) # Output: 6
print(sum_all(10, 20))    # Output: 30</code>

## **kwargs (Keyword Arguments)
\`**kwargs\` allows you to pass a variable number of keyword arguments. They are received as a dictionary.
<code>def display_info(**kwargs):
  for key, value in kwargs.items():
    print(f"{key}: {value}")

display_info(name="Sasha", course="Python")</code>
`
                },
                {
                    id: 'lesson-4-3',
                    title: 'Return Values',
                    content: `
# Return Values

Functions can return a value to the caller using the \`return\` statement.

<interactive-code-cell description="Define a function that returns the number 5." expected="def get_five(): return 5" />
<code>def square(number):
  return number * number

result = square(5)
print(f"The square is {result}") # Output: The square is 25

# A function can return multiple values
def get_name():
    return "Sasha", "Codes"

first, last = get_name()
print(f"First: {first}, Last: {last}")</code>
If a function does not have a \`return\` statement, it implicitly returns \`None\`.
`
                },
                {
                    id: 'lesson-4-4',
                    title: 'Lambda Functions',
                    content: `
# Lambda Functions

A lambda function is a small anonymous function. It can take any number of arguments, but can only have one expression.

**Syntax**: \`lambda arguments : expression\`

<interactive-code-cell description="Create a lambda function that takes 'x' and returns 'x + 1'." expected="lambda x: x + 1" />
<code># A lambda function that adds 10 to the number passed in
x = lambda a : a + 10
print(x(5)) # Output: 15

# A lambda function that multiplies two arguments
multiply = lambda a, b : a * b
print(multiply(5, 6)) # Output: 30</code>
Lambda functions are often used as anonymous functions inside other functions.
`
                },
                {
                    id: 'lesson-4-5',
                    title: 'Scope & Global Variables',
                    content: `
# Scope & Global Variables

A variable is only available from inside the region it is created. This is called scope.

## Local Scope
A variable created inside a function is available only inside that function.
<code>def my_func():
  x = 300 # Local variable
  print(x)

my_func()
# print(x) # This would cause an error</code>

## Global Scope
A variable created in the main body of the Python code is a global variable and belongs to the global scope.
To change a global variable inside a function, use the \`global\` keyword.
<code>y = 150 # Global variable

def my_other_func():
  global y
  y = 200 # Change the global variable

my_other_func()
print(y) # Output: 200</code>
`
                },
                {
                    id: 'lesson-4-6',
                    title: 'Importing & Using Modules',
                    content: `
# Importing & Using Modules

A module is a file containing Python code. We can import modules to use their functions, classes, and variables in our own code. Python has a vast standard library of modules.

<interactive-code-cell description="Import the math module and print the value of pi." expected="import math; print(math.pi)" />
<code># Import the 'math' module
import math

# Use a function from the math module
print(math.sqrt(16)) # Output: 4.0

# Import a specific function from a module
from datetime import datetime

# Use the imported function directly
print(datetime.now())</code>
Modules help in organizing code and reusing it across different programs.
`
                },
                {
                    id: 'lesson-4-7',
                    title: 'Creating Your Own Modules',
                    content: `
# Creating Your Own Modules

Any Python file can be a module. To create a module, just save the code you want in a file with a \`.py\` extension.

## Example
1.  Create a file named \`mymodule.py\`:
<code># mymodule.py
def greeting(name):
  print(f"Hello, {name}")

person = {
    "name": "John",
    "age": 36
}</code>

2. Create another file, \`main.py\`, in the same directory and import \`mymodule\`:
<code># main.py
import mymodule

mymodule.greeting("Sasha")
print(mymodule.person["age"])</code>
When you run \`main.py\`, it will execute the code using the functions and variables defined in \`mymodule.py\`.
`
                }
            ]
        },
        {
            id: 'chapter-5',
            title: 'Level 5: File Handling',
            lessons: [
                {
                    id: 'lesson-5-1',
                    title: 'Reading Files',
                    content: `
# File Handling: Reading Files

Python has functions for creating, reading, updating, and deleting files. The key function for working with files is \`open()\`.

The \`open()\` function takes two parameters; filename, and mode.
Modes for reading:
- \`"r"\` - Read - Default value. Opens a file for reading, error if the file does not exist.

It's good practice to use the \`with\` statement because it automatically closes the file for you.
<code># Assume you have a file "myfile.txt" with some text in it.

with open("myfile.txt", "r") as file:
  content = file.read() # Reads the entire file
  print(content)

# To read line by line
with open("myfile.txt", "r") as file:
  for line in file:
    print(line.strip()) # strip() removes leading/trailing whitespace</code>
`
                },
                {
                    id: 'lesson-5-2',
                    title: 'Writing Files',
                    content: `
# File Handling: Writing Files

To write to a file, you must open it in one of the write modes.

Modes for writing:
- \`"w"\` - Write - Opens a file for writing, creates the file if it does not exist. **Warning: This will overwrite any existing content.**
- \`"a"\` - Append - Opens a file for appending, creates the file if it does not exist. New content is added to the end.

<code># Write to a file (overwrites)
with open("newfile.txt", "w") as file:
  file.write("Hello, World!\\n")
  file.write("This is a new file.")

# Append to a file
with open("newfile.txt", "a") as file:
  file.write("\\nThis line is appended.")</code>
`
                },
                {
                    id: 'lesson-5-3',
                    title: 'Working with CSV Files',
                    content: `
# Working with CSV Files

CSV (Comma Separated Values) is a popular format for storing tabular data. Python's built-in \`csv\` module makes it easy to work with these files.

## Reading a CSV
<code>import csv

# Assume data.csv contains:
# name,age
# Alice,30
# Bob,25

with open('data.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)

# Output:
# ['name', 'age']
# ['Alice', '30']
# ['Bob', '25']</code>

## Writing to a CSV
<code>import csv

with open('output.csv', mode='w', newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerow(['name', 'department'])
    csv_writer.writerow(['Charlie', 'Engineering'])</code>
`
                },
                {
                    id: 'lesson-5-4',
                    title: 'Working with JSON Files',
                    content: `
# Working with JSON Files

JSON is a syntax for storing and exchanging data, based on JavaScript object notation. Python's built-in \`json\` module can be used to work with JSON data.

## Reading a JSON file (loading)
<code>import json

# Assume data.json contains: {"name": "Sasha", "course": "Python"}

with open('data.json', 'r') as file:
    data = json.load(file)
    print(data) # Output: {'name': 'Sasha', 'course': 'Python'}
    print(data['name']) # Output: Sasha</code>

## Writing to a JSON file (dumping)
<code>import json

student_data = {
    'id': 101,
    'name': 'David',
    'is_active': True
}

with open('output.json', 'w') as file:
    json.dump(student_data, file, indent=4)</code>
`
                }
            ]
        },
        {
            id: 'chapter-6',
            title: 'Level 6: Error & Exception Handling',
            lessons: [
                 {
                    id: 'lesson-6-1',
                    title: 'Common Python Errors',
                    content: `
# Common Python Errors

Understanding common errors is the first step to handling them.
- **\`SyntaxError\`**: The code is not valid Python. E.g., a missing colon.
- **\`IndentationError\`**: Incorrect indentation.
- **\`NameError\`**: Using a variable that has not been defined.
- **\`TypeError\`**: Performing an operation on an inappropriate type. E.g., \`'hello' + 5\`.
- **\`ValueError\`**: A function receives an argument of the correct type but an inappropriate value. E.g., \`int('abc')\`.
- **\`IndexError\`**: Trying to access an index that is out of range in a sequence.
- **\`KeyError\`**: Trying to access a key that does not exist in a dictionary.
`
                },
                {
                    id: 'lesson-6-2',
                    title: 'try, except, finally',
                    content: `
# try, except, finally

This structure allows you to handle exceptions gracefully.

- **\`try\`**: Contains code that might raise an exception.
- **\`except\`**: Catches and handles specific exceptions.
- **\`finally\`**: Contains code that will execute no matter what, whether an exception occurred or not.

<code>try:
    x = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
finally:
    print("This will always execute.")</code>
`
                },
                {
                    id: 'lesson-6-3',
                    title: 'Raising Exceptions (raise)',
                    content: `
# Raising Exceptions (raise)

You can choose to throw an exception if a condition occurs, using the \`raise\` keyword.

<code>def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative.")
    print(f"Age is set to {age}")

try:
    set_age(-5)
except ValueError as e:
    print(f"Error: {e}")</code>
This is useful for enforcing rules in your code.
`
                },
                {
                    id: 'lesson-6-4',
                    title: 'Custom Exceptions',
                    content: `
# Custom Exceptions

You can create your own exception classes by inheriting from the base \`Exception\` class. This can make your error handling more specific and readable.

<code>class MyCustomError(Exception):
    """A custom exception for my application."""
    pass

def check_value(value):
    if value > 100:
        raise MyCustomError("The value is too high!")

try:
    check_value(200)
except MyCustomError as e:
    print(f"Caught a custom error: {e}")</code>
`
                }
            ]
        },
        {
            id: 'chapter-7',
            title: 'Level 7: Object-Oriented Programming (OOP)',
            lessons: [
                {
                    id: 'lesson-7-1',
                    title: 'Classes & Objects',
                    content: `
# OOP: Classes & Objects

Object-Oriented Programming (OOP) is a method of structuring a program by bundling related properties and behaviors into individual **objects**.

- **Class**: A blueprint for creating objects.
- **Object**: An instance of a class.

<code># Create a class
class Dog:
  species = "Canis familiaris" # Class variable

  # Initializer / Instance Attributes
  def __init__(self, name, age):
    self.name = name # Instance variable
    self.age = age

# Create objects (instances) of the Dog class
dog1 = Dog("Buddy", 3)
dog2 = Dog("Lucy", 5)

print(f"{dog1.name} is {dog1.age} years old.")
print(f"{dog2.name} is a {dog2.species}.")</code>
`
                },
                {
                    id: 'lesson-7-2',
                    title: 'Methods (self)',
                    content: `
# OOP: Methods (self)

Functions defined inside a class are called **methods**. The first parameter of a method is always \`self\`, which refers to the instance of the class.

<code>class Dog:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  # Instance method
  def bark(self):
    print(f"{self.name} says Woof!")

my_dog = Dog("Rex", 4)
my_dog.bark() # Output: Rex says Woof!</code>
`
                },
                {
                    id: 'lesson-7-3',
                    title: 'Inheritance',
                    content: `
# OOP: Inheritance

Inheritance allows us to define a class that inherits all the methods and properties from another class.

- **Parent class** (or base class): The class being inherited from.
- **Child class** (or derived class): The class that inherits.

<code># Parent class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement abstract method")

# Child class
class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

d = Dog("Buddy")
c = Cat("Whiskers")
print(d.speak())
print(c.speak())</code>
`
                },
                {
                    id: 'lesson-7-4',
                    title: 'Special Methods (__str__, __len__)',
                    content: `
# OOP: Special Methods

Special methods (also called "magic" or "dunder" methods) have double underscores at the beginning and end of their names. They let you emulate the behavior of built-in types.

- **\`__init__\`**: The constructor for a class.
- **\`__str__\`**: Defines the string representation of an object.
- **\`__len__\`**: Defines what happens when \`len()\` is called on an object.

<code>class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        return f'"{self.title}" by {self.author}'

    def __len__(self):
        return self.pages

my_book = Book("The Hitchhiker's Guide", "Douglas Adams", 193)

print(my_book)      # Calls __str__
print(len(my_book)) # Calls __len__</code>
`
                }
            ]
        },
        {
            id: 'chapter-8',
            title: 'Level 8: Advanced Python',
            lessons: [
                {
                    id: 'lesson-8-1',
                    title: 'Iterators & Generators',
                    content: `
# Advanced: Iterators & Generators

## Iterators
An iterator is an object that contains a countable number of values. It's an object that can be iterated upon, meaning that you can traverse through all the values.

## Generators
Generators are a simple way to create iterators. They are written like regular functions but use the \`yield\` keyword to return data. When a generator function is called, it returns a generator object, which can be used to generate values on the fly.

<code># A generator function for squares
def square_generator(n):
    for i in range(n):
        yield i ** 2

# Using the generator
for square in square_generator(5):
    print(square)</code>
Generators are memory-efficient as they produce items one at a time and only when required.
`
                },
                {
                    id: 'lesson-8-2',
                    title: 'Decorators',
                    content: `
# Advanced: Decorators

Decorators allow you to add new functionality to an existing object (like a function) without modifying its structure. Decorators are usually called before the definition of a function you want to decorate.

<code>def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()</code>
`
                },
                {
                    id: 'lesson-8-3',
                    title: 'Regular Expressions (re)',
                    content: `
# Advanced: Regular Expressions (re)

A Regular Expression, or RegEx, is a sequence of characters that forms a search pattern. Python's \`re\` module provides support for regular expressions.

<code>import re

text = "The rain in Spain"

# Find all occurrences of "ai"
x = re.findall("ai", text)
print(x) # Output: ['ai', 'ai']

# Search the string to see if it starts with "The"
y = re.search("^The", text)
if y:
  print("Yes, the string starts with 'The'")</code>
`
                }
            ]
        },
        {
            id: 'chapter-9',
            title: 'Level 9: Python for Data & Automation',
            lessons: [
                {
                    id: 'lesson-9-1',
                    title: 'Using pip & Installing Packages',
                    content: `
# Using pip & Virtual Environments

## pip
\`pip\` is the package installer for Python. You can use it to install packages from the Python Package Index (PyPI).

To install a package:
<code>pip install requests</code>
To uninstall a package:
<code>pip uninstall requests</code>

## Virtual Environments (venv)
It is a best practice to use a virtual environment for each project. This creates an isolated environment for your Python packages, preventing conflicts between projects.

To create a virtual environment:
<code>python -m venv my-project-env</code>
To activate it (on macOS/Linux):
<code>source my-project-env/bin/activate</code>
To activate it (on Windows):
<code>.\\my-project-env\\Scripts\\activate</code>
`
                },
                {
                    id: 'lesson-9-2',
                    title: 'Working with requests (HTTP)',
                    content: `
# Working with requests (HTTP)

The \`requests\` library is the standard for making HTTP requests in Python.

First, install it: \`pip install requests\`

<code>import requests

# Make a GET request to an API
response = requests.get('https://api.github.com')

# Check the status code
if response.status_code == 200:
    print('Success!')
    # Print the response content (as JSON)
    print(response.json())
else:
    print('An error occurred.')</code>
`
                },
                {
                    id: 'lesson-9-3',
                    title: 'Intro to Pandas & Matplotlib',
                    content: `
# Intro to Pandas & Matplotlib

**Pandas** is a powerful library for data manipulation and analysis.
**Matplotlib** is a comprehensive library for creating static, animated, and interactive visualizations.

First, install them: \`pip install pandas matplotlib\`

<code>import pandas as pd
import matplotlib.pyplot as plt

# Create a simple DataFrame
data = {'Year': [2010, 2011, 2012, 2013],
        'Sales': [100, 120, 150, 130]}
df = pd.DataFrame(data)

print(df)

# Create a simple plot
df.plot(x='Year', y='Sales', kind='line')
plt.title('Annual Sales')
plt.ylabel('Sales in USD')
plt.show() # This will display the plot</code>
`
                }
            ]
        },
        {
            id: 'chapter-10',
            title: 'Level 10: Final Stage – Projects & Practice',
            lessons: [
                {
                    id: 'lesson-10-1',
                    title: 'Projects & Practice',
                    content: `
# Projects & Practice

The best way to learn is by doing! Now it's time to apply what you've learned to build small projects.

Here are some ideas:
- **Build a Calculator**: A simple command-line calculator that can perform basic arithmetic.
- **To-Do List App**: A console application that lets users add, view, and delete tasks.
- **Web Scraper**: Use \`requests\` and \`BeautifulSoup\` to scrape data from a website.
- **Data Analysis Mini Project**: Use \`pandas\` to analyze a small dataset (e.g., from a CSV file).
- **Automation Script**: Write a script to rename files in a folder or organize your downloads.

Congratulations on completing the learning path! Keep practicing, building, and exploring the vast world of Python.
`
                }
            ]
        }
    ]
};

export function getCourse(): Course {
    return pythonCourse;
}
