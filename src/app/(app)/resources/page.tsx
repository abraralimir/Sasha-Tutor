import { PageHeader } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const resources = [
  {
    id: 'variables',
    title: 'Python Variables and Data Types',
    content: `Variables are containers for storing data values. Python has various standard data types that are built-in.
    
# Numeric Types
x = 5       # int
y = 2.8     # float
z = 1j      # complex

# Text Type
name = "Sasha" # str

# Sequence Types
fruits = ["apple", "banana", "cherry"] # list
coordinates = (10, 20)                 # tuple

# Mapping Type
person = {"name": "John", "age": 30} # dict

# Set Types
unique_numbers = {1, 2, 3, 3, 2} # set
`,
  },
  {
    id: 'functions',
    title: 'Defining and Calling Functions',
    content: `A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.

def greet(name):
  """This function greets the person passed in as a parameter."""
  print("Hello, " + name + ". Good morning!")

# Calling the function
greet('Paul')

# Function with return value
def add(x, y):
  return x + y

result = add(5, 3)
print(result) # Output: 8
`,
  },
  {
    id: 'loops',
    title: 'Loops in Python (For and While)',
    content: `Python has two primitive loop commands: while loops and for loops.

# For Loop (iterating over a list)
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print(fruit)

# While Loop
i = 1
while i < 6:
  print(i)
  if i == 3:
    break # exit the loop
  i += 1
`,
  },
    {
    id: 'conditionals',
    title: 'Conditional Statements (If, Elif, Else)',
    content: `Python supports the usual logical conditions from mathematics. These conditions can be used in several ways, most commonly in "if statements" and loops.

a = 200
b = 33

if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
else:
  print("a is greater than b")

# Short Hand If
if a > b: print("a is greater than b")
`,
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Python Resource Hub"
        description="Your quick reference guide for core Python concepts."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {resources.map((resource) => (
              <AccordionItem value={resource.id} key={resource.id}>
                <AccordionTrigger className='text-lg font-semibold'>
                  {resource.title}
                </AccordionTrigger>
                <AccordionContent>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="language-python font-code">
                      {resource.content.trim()}
                    </code>
                  </pre>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
