
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
            title: 'Level 1: Python Foundations',
            lessons: [
                {
                    id: 'lesson-1-1',
                    title: 'Introduction to Python',
                    content: `
<h1>Welcome to Python!</h1>
<p>Python is a powerful, versatile, and beginner-friendly programming language. It's used everywhere, from web development (like Instagram and YouTube) to data science, artificial intelligence, and more.</p>
<h2>What is a Programming Language?</h2>
<p>Think of it as a set of instructions you can give to a computer to make it perform tasks. Just like we use languages like English to communicate with each other, we use programming languages like Python to communicate with computers.</p>
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
                        },
                         {
                            question: "What is a 'function' in programming?",
                            options: ["A variable that holds text", "A reusable block of code that performs a specific action", "A type of error", "A way to stop the program"],
                            correctAnswer: "A reusable block of code that performs a specific action"
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
                        },
                        {
                            question: "What value would a variable of type 'bool' hold?",
                            options: ["A number", "Text", "True or False", "A list of items"],
                            correctAnswer: "True or False"
                        }
                    ]
                },
                {
                    id: 'lesson-1-3',
                    title: 'Numbers & Math',
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
                            question: "What is the result of the expression `2 ** 3` in Python?",
                            options: ["8", "6", "5", "9"],
                            correctAnswer: "8"
                        },
                        {
                            question: "What does the modulo operator (`%`) do?",
                            options: ["Calculates the percentage", "Finds the remainder of a division", "Performs multiplication", "Rounds a number"],
                            correctAnswer: "Finds the remainder of a division"
                        },
                         {
                            question: "What is the value of `(2 + 2) * 3`?",
                            options: ["8", "12", "10", "9"],
                            correctAnswer: "12"
                        }
                    ]
                },
                 {
                    id: 'lesson-1-4',
                    title: 'Working with Strings',
                    content: `
<h1>Mastering Text: Strings</h1>
<p>Strings are sequences of characters, used to store text. We've already seen them with <code>print("Hello, World!")</code>. Let's dive deeper.</p>
<h2>Concatenation</h2>
<p>You can combine strings using the <code>+</code> operator. This is called concatenation.</p>
<code>first_name = "Sasha"
last_name = "Codes"
full_name = first_name + " " + last_name
print(full_name)  # Output: Sasha Codes
</code>
<h2>String Methods</h2>
<p>Strings come with many built-in functions called <strong>methods</strong> that let you perform common tasks. You call them using a dot <code>.</code> after the string variable.</p>
<ul>
    <li><code>.lower()</code>: Converts the string to lowercase.</li>
    <li><code>.upper()</code>: Converts the string to uppercase.</li>
    <li><code>.strip()</code>: Removes any whitespace from the beginning or end.</li>
    <li><code>.replace(old, new)</code>: Replaces a substring with another.</li>
</ul>
<code>message = "  Hello Python!  "
print(message.strip().upper()) # Output: HELLO PYTHON!
</code>
<h2>F-Strings</h2>
<p>F-strings (formatted string literals) are a modern and convenient way to embed expressions inside string literals.</p>
<code>name = "Sasha"
age = 10
greeting = f"Hello, my name is {name} and I am {age} years old."
print(greeting)
</code>
<interactive-code-cell description="Create a variable 'shout' with the value 'hello' converted to all uppercase letters." expected="shout = 'hello'.upper()" />
`,
                    quiz: [
                        {
                            question: "What is the term for combining two strings together with the `+` operator?",
                            options: ["Addition", "Merging", "Concatenation", "Joining"],
                            correctAnswer: "Concatenation"
                        },
                        {
                            question: "Which string method would you use to remove leading and trailing whitespace?",
                            options: [".trim()", ".clean()", ".remove_space()", ".strip()"],
                            correctAnswer: ".strip()"
                        },
                         {
                            question: "What would `f'2 + 2 = {2+2}'` evaluate to?",
                            options: ["f'2 + 2 = 4'", "2 + 2 = {2+2}", "2 + 2 = 4", "An error"],
                            correctAnswer: "2 + 2 = 4"
                        }
                    ]
                },
            ]
        },
        {
            id: 'chapter-2',
            title: 'Level 2: Control Flow',
            lessons: [
                {
                    id: 'lesson-2-1',
                    title: 'Conditional Logic (if/elif/else)',
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
                        },
                        {
                            question: "Which operator is used to check for equality?",
                            options: ["=", "==", "!=", "=>"],
                            correctAnswer: "=="
                        }
                    ]
                },
                {
                    id: 'lesson-2-2',
                    title: '`for` Loops',
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
                        },
                        {
                            question: "In `for item in items:`, what is `item`?",
                            options: ["The entire list", "A temporary variable holding the current element", "The index of the current element", "A keyword that can't be changed"],
                            correctAnswer: "A temporary variable holding the current element"
                        }
                    ]
                },
                {
                    id: 'lesson-2-3',
                    title: '`while` Loops',
                    content: `
<h1>Conditional Looping: The 'while' Loop</h1>
<p>While a <code>for</code> loop runs for each item in a sequence, a <code>while</code> loop runs as long as a certain condition is true.</p>
<h2>Structure of a \\\`while\\\` Loop</h2>
<p>A <code>while</code> loop continuously executes a block of code as long as its condition evaluates to <code>True</code>.</p>
<code>count = 0
while count < 5:
    print(count)
    count = count + 1 # Or more concisely: count += 1
</code>
<p>This code will print the numbers 0, 1, 2, 3, and 4. The line <code>count = count + 1</code> is crucial. It's the <strong>update step</strong>. Without it, <code>count</code> would always be 0, the condition <code>count < 5</code> would always be true, and the loop would run forever! This is called an <strong>infinite loop</strong>.</p>
<h2>When to use \\\`while\\\` vs \\\`for\\\`</h2>
<ul>
    <li>Use a <strong>\\\`for\\\` loop</strong> when you know how many times you want to loop (e.g., for every item in a list, for 10 repetitions).</li>
    <li>Use a <strong>\\\`while\\\` loop</strong> when you want to loop until a certain condition changes (e.g., until the user enters 'quit', until a health bar reaches 0).</li>
</ul>
<interactive-code-cell description="Initialize a variable 'n' to 3. Write a while loop that prints 'Go!' as long as 'n' is greater than 0, and decrements n by 1 each time." expected="n = 3; while n > 0: print('Go!'); n -= 1" />
`,
                    quiz: [
                        {
                            question: "What happens if you forget to include a line that changes the condition variable in a `while` loop?",
                            options: ["The program crashes", "The loop runs once", "The loop doesn't run at all", "It creates an infinite loop"],
                            correctAnswer: "It creates an infinite loop"
                        },
                        {
                            question: "You need to write a program that keeps asking for user input until they type 'exit'. Which loop is better suited for this?",
                            options: ["`for` loop", "`while` loop", "Either is fine", "Neither is suitable"],
                            correctAnswer: "`while` loop"
                        },
                        {
                            question: "What is the primary difference between a `for` loop and a `while` loop?",
                            options: ["`for` loops are faster", "`for` loops iterate over a sequence, `while` loops iterate as long as a condition is true", "`while` loops can only count up", "`for` loops can't have `if` statements inside them"],
                            correctAnswer: "`for` loops iterate over a sequence, `while` loops iterate as long as a condition is true"
                        }
                    ]
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
<h1>Organizing Data: Lists</h1>
<p>A list is an ordered and changeable collection of items. Lists are one of the most versatile data structures in Python.</p>
<h2>Creating and Accessing Lists</h2>
<p>You create a list by placing items inside square brackets <code>[]</code>, separated by commas.</p>
<code>my_list = [10, "hello", True, 3.14]</code>
<p>You can access items in a list using their <strong>index</strong>, which starts at 0.</p>
<code>colors = ["red", "green", "blue"]
first_color = colors[0] # "red"
second_color = colors[1] # "green"
</code>
<h2>Modifying Lists</h2>
<p>Lists are mutable, meaning you can change them after they are created.</p>
<ul>
    <li><strong>Append:</strong> Add an item to the end with <code>.append()</code>.</li>
    <li><strong>Remove:</strong> Remove an item with <code>.remove()</code>.</li>
    <li><strong>Change an item:</strong> Reassign a value at a specific index.</li>
</ul>
<code>numbers = [1, 2, 3]
numbers.append(4) # numbers is now [1, 2, 3, 4]
numbers[0] = 99  # numbers is now [99, 2, 3, 4]
</code>
<interactive-code-cell description="Create a list named 'items' containing the numbers 1, 2, and 3." expected="items = [1, 2, 3]" />
`,
                    quiz: [
                        {
                            question: "What is the index of the first item in a Python list?",
                            options: ["1", "A", "-1", "0"],
                            correctAnswer: "0"
                        },
                        {
                            question: "Which method is used to add an element to the end of a list?",
                            options: [".add()", ".insert()", ".append()", ".push()"],
                            correctAnswer: ".append()"
                        },
                        {
                            question: "What does 'mutable' mean in the context of a list?",
                            options: ["It cannot be changed", "It can be changed after creation", "It can only hold numbers", "It is ordered"],
                            correctAnswer: "It can be changed after creation"
                        }
                    ]
                },
                {
                    id: 'lesson-3-2',
                    title: 'Dictionaries',
                    content: `
<h1>Key-Value Pairs: Dictionaries</h1>
<p>A dictionary is an unordered collection of data values, used to store data values like a map. Unlike lists, which are indexed by a range of numbers, dictionaries are indexed by <strong>keys</strong>.</p>
<h2>Creating and Accessing Dictionaries</h2>
<p>You create a dictionary using curly braces <code>{}</code> with key-value pairs.</p>
<code>student = {
    "name": "Sasha",
    "age": 10,
    "grade": "A"
}
</code>
<p>You access values by their key, not by an index.</p>
<code>student_name = student["name"] # "Sasha"
</code>
<h2>Modifying Dictionaries</h2>
<p>Dictionaries are also mutable.</p>
<ul>
    <li><strong>Add/Update:</strong> You can add a new key-value pair or update an existing one.</li>
    <li><strong>Remove:</strong> Remove a pair with <code>del</code>.</li>
</ul>
<code># Add a new key
student["course"] = "Python"
# Update an existing key
student["age"] = 11
# Remove a key
del student["grade"]
</code>
<interactive-code-cell description="Create a dictionary 'car' with a key 'color' and value 'red'." expected="car = {'color': 'red'}" />
`,
                    quiz: [
                        {
                            question: "How do you access the value associated with a key in a dictionary?",
                            options: ["Using its numerical index, like `dict[0]`", "Using the key, like `dict['key']`", "Using the `.get_value()` method", "You cannot access individual values"],
                            correctAnswer: "Using the key, like `dict['key']`"
                        },
                        {
                            question: "What kind of brackets are used to define a dictionary?",
                            options: ["Parentheses ()", "Square brackets []", "Curly braces {}", "Angle brackets <>"],
                            correctAnswer: "Curly braces {}"
                        },
                        {
                            question: "In a dictionary, what is the 'name' part of `\"name\": \"Sasha\"` called?",
                            options: ["The value", "The item", "The key", "The element"],
                            correctAnswer: "The key"
                        }
                    ]
                },
                 {
                    id: 'lesson-3-3',
                    title: 'Tuples and Sets',
                    content: `
<h1>Specialized Collections: Tuples and Sets</h1>
<p>While lists and dictionaries are the most common data structures, Python offers two others for specific use cases: tuples and sets.</p>
<h2>Tuples</h2>
<p>A tuple is an <strong>ordered and unchangeable</strong> collection of items. Think of it as a list that cannot be modified after it's created. This is useful for data that should not change, like coordinates or RGB color values.</p>
<p>You create tuples using parentheses <code>()</code>.</p>
<code>point = (10, 20)
print(point[0]) # Accessing works just like lists
</code>
<p>The main difference is that you cannot append, remove, or change items. <code>point[0] = 5</code> would cause an error.</p>
<h2>Sets</h2>
<p>A set is an <strong>unordered and unindexed</strong> collection of <strong>unique</strong> items. The key features are that they don't allow duplicate elements and they are very fast for checking if an item is present.</p>
<p>You create sets using curly braces <code>{}</code>, but without key-value pairs.</p>
<code>numbers = {1, 2, 3, 3, 4, 2}
print(numbers) # Output: {1, 2, 3, 4}
</code>
<p>Sets are great for removing duplicates from a list or for performing mathematical set operations like union and intersection.</p>
<interactive-code-cell description="Create a tuple named 'rgb' with the values 255, 0, 128." expected="rgb = (255, 0, 128)" />
`,
                    quiz: [
                        {
                            question: "What is the main difference between a list and a tuple?",
                            options: ["Lists are ordered, tuples are not", "Tuples are mutable, lists are not", "Lists are mutable, tuples are not", "There is no difference"],
                            correctAnswer: "Lists are mutable, tuples are not"
                        },
                        {
                            question: "What happens if you try to add a duplicate item to a set?",
                            options: ["It raises an error", "It adds the item twice", "It is ignored", "It replaces the existing item"],
                            correctAnswer: "It is ignored"
                        },
                         {
                            question: "Which data structure is best for storing a collection of items where you need to frequently check for the existence of an item?",
                            options: ["List", "Tuple", "Set", "Dictionary"],
                            correctAnswer: "Set"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-4',
            title: 'Level 4: Functions & Modules',
            lessons: [
                 {
                    id: 'lesson-4-1',
                    title: 'Defining Functions',
                    content: `
<h1>Creating Reusable Code: Functions</h1>
<p>A function is a block of organized, reusable code that is used to perform a single, related action. Functions provide better modularity for your application and a high degree of code reusing.</p>
<h2>Defining a Function</h2>
<p>You define a function using the <code>def</code> keyword, followed by a function name, parentheses <code>()</code>, and a colon <code>:</code>. The code block within every function starts with an indentation.</p>
<code>def greet():
    print("Hello from a function!")
</code>
<h2>Calling a Function</h2>
<p>To execute the function, you "call" it by its name followed by parentheses.</p>
<code>greet() # This will print "Hello from a function!"
</code>
<h2>Parameters and Arguments</h2>
<p>You can pass information into a function through parameters (also called arguments).</p>
<code>def greet_user(name):
    print(f"Hello, {name}!")

greet_user("Sasha") # Prints "Hello, Sasha!"
greet_user("Alex")  # Prints "Hello, Alex!"
</code>
<h2>Return Values</h2>
<p>Functions can also send a value back to the code that called it. This is done using the <code>return</code> keyword.</p>
<code>def add_numbers(x, y):
    return x + y

sum_result = add_numbers(5, 3)
print(sum_result) # Prints 8
</code>
<interactive-code-cell description="Define a function 'say_hi' that prints the string 'Hi!'." expected="def say_hi(): print('Hi!')" />
`,
                    quiz: [
                        {
                            question: "Which keyword is used to define a function in Python?",
                            options: ["function", "def", "create", "fun"],
                            correctAnswer: "def"
                        },
                        {
                            question: "What is the purpose of the `return` keyword in a function?",
                            options: ["To print a value to the console", "To stop the function's execution", "To send a value back to the caller", "To define a parameter"],
                            correctAnswer: "To send a value back to the caller"
                        },
                        {
                            question: "What is a 'parameter' in a function definition?",
                            options: ["The value returned by the function", "A variable listed inside the parentheses in the function definition", "The name of the function", "The indented code block"],
                            correctAnswer: "A variable listed inside the parentheses in the function definition"
                        }
                    ]
                },
                 {
                    id: 'lesson-4-2',
                    title: 'Importing Modules',
                    content: `
<h1>Using External Code: Modules</h1>
<p>A module is simply a file containing Python code. Modules allow you to logically organize your Python code. Grouping related code into a module makes the code easier to understand and use.</p>
<p>Python has a huge <strong>standard library</strong> of modules that come with it, and there are millions more third-party modules you can install.</p>
<h2>The <code>import</code> Statement</h2>
<p>To use the code from a module, you need to import it using the <code>import</code> keyword. A common module is the <code>math</code> module, which provides mathematical functions.</p>
<code>import math

# Now you can use functions from the math module
x = 16
square_root = math.sqrt(x)
print(square_root) # Prints 4.0
</code>
<h2>Importing Specific Functions</h2>
<p>If you only need one or two functions from a module, you can import them directly using <code>from ... import ...</code>.</p>
<code>from random import choice

players = ["Alice", "Bob", "Charlie"]
winner = choice(players) # No need to write random.choice()
print(f"The winner is {winner}!")
</code>
<h2>Giving a Module an Alias</h2>
<p>Sometimes module names can be long. You can give them a shorter alias using the <code>as</code> keyword. This is very common with libraries like Pandas.</p>
<code>import pandas as pd
</code>
<interactive-code-cell description="Import the \\\`randint\\\` function from the \\\`random\\\` module." expected="from random import randint" />
`,
                    quiz: [
                        {
                            question: "Which module in the standard library would you import to get the value of Pi (π)?",
                            options: ["`random`", "`datetime`", "`math`", "`os`"],
                            correctAnswer: "`math`"
                        },
                        {
                            question: "What is the keyword used to give an imported module a shorter nickname?",
                            options: ["`alias`", "`rename`", "`as`", "`like`"],
                            correctAnswer: "`as`"
                        },
                        {
                            question: "What is the Python Standard Library?",
                            options: ["A single file with all Python code", "A collection of modules included with Python", "A website for Python help", "A paid add-on for advanced features"],
                            correctAnswer: "A collection of modules included with Python"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-5',
            title: 'Level 5: Object-Oriented Programming (OOP)',
            lessons: [
                {
                    id: 'lesson-5-1',
                    title: 'Classes and Objects',
                    content: `
<h1>A New Way of Thinking: Object-Oriented Programming</h1>
<p>Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data (attributes) and code (methods).</p>
<h2>Classes: The Blueprint</h2>
<p>A <strong>class</strong> is like a blueprint for creating objects. It defines the properties (attributes) and behaviors (methods) that all objects of that class will have.</p>
<p>You define a class using the <code>class</code> keyword.</p>
<code>class Dog:
    # This is a special method called the constructor
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # This is a method
    def bark(self):
        print("Woof!")
</code>
<h2>Objects: The Instance</h2>
<p>An <strong>object</strong> (or instance) is a specific creation based on a class. You can create multiple objects from the same class.</p>
<code># Creating two Dog objects
my_dog = Dog("Rex", 5)
your_dog = Dog("Lucy", 3)

print(my_dog.name) # Prints "Rex"
your_dog.bark()   # Prints "Woof!"
</code>
<p>The <code>__init__</code> method is called automatically when you create a new object. The <code>self</code> parameter refers to the instance itself, allowing you to store attributes like <code>self.name</code>.</p>
<interactive-code-cell description="Create a simple class named 'Cat' with a pass statement inside." expected="class Cat: pass" />
`,
                    quiz: [
                        {
                            question: "In OOP, what is a 'class' often compared to?",
                            options: ["A specific object", "A blueprint", "A function", "A variable"],
                            correctAnswer: "A blueprint"
                        },
                        {
                            question: "What is the special method used to initialize an object's attributes?",
                            options: ["`__start__()`", "`__main__()`", "`__init__()`", "`__create__()`"],
                            correctAnswer: "`__init__()`"
                        },
                        {
                            question: "What is an 'attribute' in the context of a class?",
                            options: ["A function inside a class", "A variable that belongs to an object", "The name of the class", "The `class` keyword"],
                            correctAnswer: "A variable that belongs to an object"
                        }
                    ]
                },
                {
                    id: 'lesson-5-2',
                    title: 'Inheritance',
                    content: `
<h1>Building on a Foundation: Inheritance</h1>
<p>Inheritance allows us to define a class that inherits all the methods and properties from another class. This is a core concept in OOP that promotes code reuse.</p>
<h2>Parent and Child Classes</h2>
<p>The class being inherited from is called the <strong>parent class</strong> (or base class). The class that inherits from another class is called the <strong>child class</strong> (or derived class).</p>
<p>Let's create a general <code>Animal</code> class and then a specific <code>Cat</code> class that inherits from it.</p>
<code>class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("Some generic animal sound")

# The Cat class inherits from Animal
class Cat(Animal):
    def purr(self):
        print("Purrrr...")
</code>
<h2>Using Inherited and Child-Specific Methods</h2>
<p>An object of the <code>Cat</code> class can use methods from both the <code>Animal</code> parent class and its own <code>Cat</code> class.</p>
<code>my_cat = Cat("Whiskers")
my_cat.speak() # Output: Some generic animal sound
my_cat.purr()  # Output: Purrrr...
</code>
<p>We can also <strong>override</strong> parent methods by defining a method with the same name in the child class.</p>
<interactive-code-cell description="Define a \\\`Fish\\\` class that inherits from the \\\`Animal\\\` class (assuming Animal is defined)." expected="class Fish(Animal): pass" />
`,
                    quiz: [
                        {
                            question: "In inheritance, what is the class that is being inherited from called?",
                            options: ["Child Class", "Sub Class", "Derived Class", "Parent Class"],
                            correctAnswer: "Parent Class"
                        },
                        {
                            question: "What does a child class automatically get from its parent class?",
                            options: ["Only attributes", "Nothing", "All methods and attributes", "Only methods"],
                            correctAnswer: "All methods and attributes"
                        },
                         {
                            question: "What is it called when a child class provides its own implementation of a method that is already defined in its parent class?",
                            options: ["Overloading", "Overriding", "Overwriting", "Overruling"],
                            correctAnswer: "Overriding"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-6',
            title: 'Level 6: File Handling',
            lessons: [
                 {
                    id: 'lesson-6-1',
                    title: 'Reading and Writing Files',
                    content: `
<h1>Working with Files</h1>
<p>A lot of programming involves reading data from and writing data to files. Python provides simple and powerful tools to do this.</p>
<h2>The <code>with open(...)</code> Statement</h2>
<p>The recommended way to work with files is using the <code>with open(...) as ...</code> syntax. This ensures that the file is automatically closed when you're done with it, even if errors occur.</p>
<h2>Writing to a File</h2>
<p>To write to a file, you open it in 'write' mode (<code>'w'</code>). Be careful: this will overwrite the file if it already exists!</p>
<code>with open('greeting.txt', 'w') as f:
    f.write('Hello, file!')
</code>
<h2>Reading from a File</h2>
<p>To read a file's contents, you open it in 'read' mode (<code>'r'</code>), which is the default.</p>
<code>with open('greeting.txt', 'r') as f:
    content = f.read()
print(content) # Output: Hello, file!
</code>
<h2>Appending to a File</h2>
<p>If you want to add content to the end of an existing file without deleting its contents, use 'append' mode (<code>'a'</code>).</p>
<code>with open('greeting.txt', 'a') as f:
    f.write('\\nWelcome back!')
</code>
<interactive-code-cell description="Write the Python code to open a file named 'data.txt' in write mode." expected="with open('data.txt', 'w') as f:" />
`,
                    quiz: [
                        {
                            question: "What is the main advantage of using the `with open(...)` syntax?",
                            options: ["It makes files run faster", "It automatically closes the file", "It can only be used for reading", "It encrypts the file"],
                            correctAnswer: "It automatically closes the file"
                        },
                        {
                            question: "Which mode would you use to add content to the end of an existing file?",
                            options: ["'r' (read)", "'w' (write)", "'a' (append)", "'x' (create)"],
                            correctAnswer: "'a' (append)"
                        },
                         {
                            question: "What happens if you open an existing file in 'w' (write) mode?",
                            options: ["An error occurs", "It adds new content to the end", "Its existing content is erased", "It opens in read-only mode"],
                            correctAnswer: "Its existing content is erased"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-7',
            title: 'Level 7: Error Handling',
            lessons: [
                 {
                    id: 'lesson-7-1',
                    title: 'Try and Except Blocks',
                    content: `
<h1>Handling the Unexpected: Errors</h1>
<p>Errors, or <strong>exceptions</strong>, are a normal part of programming. A good program anticipates and handles potential errors gracefully instead of crashing.</p>
<h2>The <code>try...except</code> Block</h2>
<p>Python's primary tool for handling errors is the <code>try...except</code> block. You put the code that might cause an error in the <code>try</code> block, and the code to run if an error occurs in the <code>except</code> block.</p>
<p>A common error is trying to divide by zero.</p>
<code>try:
    result = 10 / 0
except ZeroDivisionError:
    print("You can't divide by zero!")
</code>
<p>Without the <code>try...except</code>, this code would crash. With it, it prints a user-friendly message and continues.</p>
<h2>Handling Multiple Exceptions</h2>
<p>You can handle different types of exceptions by adding more <code>except</code> blocks.</p>
<code>try:
    # Code that might cause different errors
except ZeroDivisionError:
    # Handle this specific error
except FileNotFoundError:
    # Handle this one
except:
    # Handle any other error
</code>
<interactive-code-cell description="Write a simple try block that attempts to print a variable \\\`x\\\` (which is not defined)." expected="try: print(x)" />
`,
                    quiz: [
                        {
                            question: "Which block contains the code that might raise an exception?",
                            options: ["`except`", "`finally`", "`try`", "`if`"],
                            correctAnswer: "`try`"
                        },
                        {
                            question: "What is the purpose of the `except` block?",
                            options: ["To always run, regardless of errors", "To define the error-prone code", "To contain the code that runs if an error occurs", "To crash the program"],
                            correctAnswer: "To contain the code that runs if an error occurs"
                        },
                         {
                            question: "What would happen if you try `10 / 0` outside of a `try` block?",
                            options: ["The program prints an error and continues", "The program crashes", "The result is 0", "The result is infinity"],
                            correctAnswer: "The program crashes"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-8',
            title: 'Level 8: Advanced Concepts',
            lessons: [
                {
                    id: 'lesson-8-1',
                    title: 'List Comprehensions',
                    content: `
<h1>Elegant Looping: List Comprehensions</h1>
<p>List comprehensions provide a concise and readable way to create lists. They are often more efficient and easier to write than a standard <code>for</code> loop.</p>
<h2>The Basic Syntax</h2>
<p>A list comprehension consists of brackets containing an expression followed by a <code>for</code> clause.</p>
<p>Imagine you have a list of numbers and you want to create a new list containing the square of each number. Here's the standard <code>for</code> loop way:</p>
<code>numbers = [1, 2, 3, 4]
squares = []
for n in numbers:
    squares.append(n * n)
# squares is now [1, 4, 9, 16]
</code>
<p>Here's the same thing as a list comprehension:</p>
<code>numbers = [1, 2, 3, 4]
squares = [n * n for n in numbers]
</code>
<h2>Adding a Condition</h2>
<p>You can also add an <code>if</code> condition to filter the items.</p>
<code># Get only the squares of even numbers
numbers = [1, 2, 3, 4, 5, 6]
even_squares = [n * n for n in numbers if n % 2 == 0]
# even_squares is now [4, 16, 36]
</code>
<interactive-code-cell description="Use a list comprehension to create a list of the numbers 0, 1, 2 from \\\`range(3)\\\`." expected="[i for i in range(3)]" />
`,
                    quiz: [
                        {
                            question: "What is the primary benefit of using a list comprehension?",
                            options: ["They are the only way to create lists", "They are more verbose but easier for beginners", "They offer a concise syntax for creating lists from sequences", "They run slower than `for` loops"],
                            correctAnswer: "They offer a concise syntax for creating lists from sequences"
                        },
                        {
                            question: "What is the list comprehension equivalent of this code: `[c.upper() for c in 'hello']`?",
                            options: ["['H', 'E', 'L', 'L', 'O']", "['h', 'e', 'l', 'l', 'o']", "'HELLO'", "An error"],
                            correctAnswer: "['H', 'E', 'L', 'L', 'O']"
                        }
                    ]
                },
                 {
                    id: 'lesson-8-2',
                    title: 'Lambda Functions',
                    content: `
<h1>Anonymous Functions: Lambda</h1>
<p>A lambda function is a small, anonymous function. It can take any number of arguments, but can only have one expression. They are useful when you need a simple function for a short period of time.</p>
<h2>Syntax</h2>
<p>The syntax is: <code>lambda arguments: expression</code></p>
<p>Here's a normal function that adds 10 to a number:</p>
<code>def add_ten(x):
    return x + 10
</code>
<p>Here is the same function as a lambda:</p>
<code>add_ten = lambda x: x + 10
print(add_ten(5)) # Output: 15
</code>
<h2>When to Use Lambdas</h2>
<p>Lambdas are most powerful when used as an anonymous function inside another function. For example, they are often used with functions like <code>sorted()</code>, <code>map()</code>, and <code>filter()</code>.</p>
<code># Sort a list of tuples by the second element
points = [(1, 5), (3, 2), (5, 8)]
sorted_points = sorted(points, key=lambda point: point[1])
# sorted_points is now [(3, 2), (1, 5), (5, 8)]
</code>
<interactive-code-cell description="Write a lambda function that takes two arguments, \\\`a\\\` and \\\`b\\\`, and returns their product." expected="lambda a, b: a * b" />
`,
                    quiz: [
                        {
                            question: "What is a key characteristic of a lambda function?",
                            options: ["It must have a name", "It can have multiple expressions", "It is a small, anonymous function", "It can't take any arguments"],
                            correctAnswer: "It is a small, anonymous function"
                        },
                        {
                            question: "How many expressions can a lambda function have?",
                            options: ["As many as needed", "Only one", "Two", "None"],
                            correctAnswer: "Only one"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-9',
            title: 'Level 9: Working with Libraries',
            lessons: [
                 {
                    id: 'lesson-9-1',
                    title: 'Using `pip` and Installing Packages',
                    content: `
<h1>Expanding Python's Power: Packages</h1>
<p>While Python's standard library is extensive, the true power of the Python ecosystem comes from the millions of third-party packages available.</p>
<h2>PyPI: The Python Package Index</h2>
<p>The Python Package Index (PyPI) is a vast repository of software for the Python programming language. Think of it as an app store for Python libraries.</p>
<h2>\\\`pip\\\`: The Package Installer</h2>
<p><code>pip</code> is the standard package-management system used to install and manage software packages written in Python. It's included with modern versions of Python.</p>
<p>To install a package, you use the command line (like Terminal or Command Prompt) and type:</p>
<code>pip install package-name</code>
<p>For example, to install the popular \\\`requests\\\` library for making HTTP requests, you would run:</p>
<code>pip install requests</code>
<h2>Using an Installed Package</h2>
<p>Once a package is installed, you can use it in your code just like any other module by importing it.</p>
<code>import requests

response = requests.get('https://api.github.com')
print(response.status_code) # Prints 200 if successful
</code>
<interactive-code-cell description="What is the command to install the data science library 'pandas' using pip?" expected="pip install pandas" />
`,
                    quiz: [
                        {
                            question: "What is `pip`?",
                            options: ["A Python code editor", "Python's standard package installer", "A website for Python tutorials", "A built-in Python function"],
                            correctAnswer: "Python's standard package installer"
                        },
                        {
                            question: "What is PyPI?",
                            options: ["A popular Python conference", "A type of Python data structure", "The official third-party software repository for Python", "A tool for debugging code"],
                            correctAnswer: "The official third-party software repository for Python"
                        }
                    ]
                }
            ]
        },
        {
            id: 'chapter-10',
            title: 'Level 10: Final Project',
            lessons: [
                {
                    id: 'lesson-10-1',
                    title: 'Putting It All Together',
                    content: `
<h1>Congratulations!</h1>
<p>You've reached the final stage of your foundational Python journey. You have learned about variables, data types, control flow, data structures, functions, OOP, and how to handle files and errors. Now it's time to put it all together.</p>
<h2>Project Idea: Simple Contact Book</h2>
<p>A great way to practice your skills is to build a simple command-line contact book. Here's a possible structure:</p>
<ol>
    <li>Use a dictionary to store contacts, where the key is the contact's name and the value is another dictionary with details like phone number and email.</li>
    <li>Create functions to:
        <ul>
            <li>Add a new contact.</li>
            <li>View a contact.</li>
            <li>Delete a contact.</li>
            <li>List all contacts.</li>
        </ul>
    </li>
    <li>Use a <code>while</code> loop to keep the program running, asking the user for input (e.g., 'add', 'view', 'exit').</li>
    <li>(Advanced) Save the contacts dictionary to a file (like a JSON file) when the program exits and load it when it starts.</li>
</ol>
<h2>Next Steps</h2>
<p>Programming is a journey of continuous learning. Don't stop here! Explore libraries that interest you:</p>
<ul>
    <li><strong>Web Development:</strong> Django, Flask</li>
    <li><strong>Data Science:</strong> Pandas, NumPy, Matplotlib</li>
    <li><strong>Game Development:</strong> Pygame</li>
    <li><strong>Automation:</strong> Selenium, Beautiful Soup</li>
</ul>
<p>Keep coding, keep building, and keep learning!</p>
<interactive-code-cell description="What data structure is recommended for storing the main collection of contacts?" expected="A dictionary" />
`,
                    quiz: [
                        {
                            question: "What is a good way to keep a command-line application running until the user decides to quit?",
                            options: ["A `for` loop with `range(100)`", "An `if` statement", "A `while` loop that checks for an 'exit' command", "A list comprehension"],
                            correctAnswer: "A `while` loop that checks for an 'exit' command"
                        },
                        {
                            question: "To save your contact data permanently, you would need to use which concept we learned?",
                            options: ["Dictionaries", "File Handling", "For Loops", "Lambda Functions"],
                            correctAnswer: "File Handling"
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
<interactive-code-cell description="Write an IF function that checks if cell B2 is equal to 'Yes' and returns 100 if true, and 0 if false." expected="=IF(B2=\\"Yes\\", 100, 0)" />
                    `,
                    quiz: [
                        {
                            question: "How many arguments does the IF function take?",
                            options: ["1", "2", "3", "4"],
                            correctAnswer: "3"
                        },
                        {
                            question: "In the formula \`=IF(C1<10, 'Under', 'Over')\`, what is the result if cell C1 contains the value 5?",
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
