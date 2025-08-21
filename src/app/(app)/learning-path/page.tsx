'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Lock, Play } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const chapters = [
  {
    id: 'intro',
    title: 'What is Python?',
    content: `
# 1. Welcome to the Path to Python
Python is a high-level, interpreted programming language known for its readability and simplicity. Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability with its notable use of significant whitespace.

## Key Features
- **Easy to Learn:** Python has a simple syntax similar to the English language.
- **Versatile:** It's used in web development, data science, artificial intelligence, automation, and more.
- **Large Community:** A massive community means plenty of libraries, frameworks, and support.

This course will take you from the very basics to more advanced topics. Let's get started!
`,
  },
  {
    id: 'hello-world',
    title: 'Hello, World!',
    content: `
# 2. Your First Python Program
The "Hello, World!" program is a classic tradition in computer programming. It's a simple program that outputs "Hello, World!" on the screen. It's often the very first program developers write.

## The 'print()' function
In Python, you use the \`print()\` function to output text to the console. Whatever you put inside the parentheses will be displayed.

## Writing the code
To print "Hello, World!", you just need one line of code:
\`\`\`python
print("Hello, World!")
\`\`\`

This tells Python to call the print function and pass it the string "Hello, World!" as an argument.
`,
  },
  {
    id: 'variables',
    title: 'Variables & Data Types',
    content: `
# 3. Storing Information
Variables are containers for storing data values. In Python, you don't need to declare the type of a variable; the type is inferred when you assign a value to it.

## Common Data Types
- **Text Type:** \`str\` (e.g., "Sasha")
- **Numeric Types:** \`int\` (e.g., 5), \`float\` (e.g., 2.8)
- **Sequence Types:** \`list\` (e.g., ["apple", "banana"]), \`tuple\`
- **Mapping Type:** \`dict\` (e.g., {"name": "John", "age": 30})
- **Boolean Type:** \`bool\` (e.g., True or False)

## Example
\`\`\`python
name = "Sasha"       # A string variable
age = 8              # An integer variable
is_learning = True   # A boolean variable

print(name)
print(age)
\`\`\`
`,
  },
  {
    id: 'functions',
    title: 'Functions',
    content: `
# 4. Reusable Blocks of Code
A function is a block of organized, reusable code that is used to perform a single, related action. Functions provide better modularity for your application and a high degree of code reusing.

## Defining a Function
You define a function using the \`def\` keyword.
\`\`\`python
def greet(name):
  """This function greets the person passed in as a parameter."""
  print("Hello, " + name + "!")

# Calling the function
greet('Sasha')
\`\`\`

## Functions with Return Values
Functions can also return values using the \`return\` statement.
\`\`\`python
def add_numbers(x, y):
  return x + y

result = add_numbers(5, 3)
print(result) # Output: 8
\`\`\`
`,
  },
];


function CircularProgress({ progress }: { progress: number }) {
  const size = 60;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-border"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}


export default function LearningPathPage() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const { scrollTop, scrollHeight, clientHeight } = contentEl;
      if (scrollHeight <= clientHeight) {
        setScrollProgress(100);
        return;
      }
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      contentEl.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => contentEl.removeEventListener('scroll', handleScroll);
    }
  }, [activeChapter, handleScroll]);

  const handleChapterChange = (chapterId: string) => {
    setActiveChapter(chapterId);
    setScrollProgress(0);
    if(contentRef.current) {
        contentRef.current.scrollTop = 0;
    }
  };

  const completeChapter = () => {
    if (!completedChapters.includes(activeChapter)) {
      setCompletedChapters(prev => [...prev, activeChapter]);
    }
    const currentIndex = chapters.findIndex(c => c.id === activeChapter);
    if (currentIndex < chapters.length - 1) {
      handleChapterChange(chapters[currentIndex + 1].id);
    }
  };

  const isChapterUnlocked = (chapterId: string) => {
    const chapterIndex = chapters.findIndex(c => c.id === chapterId);
    if (chapterIndex === 0) return true;
    const prevChapterId = chapters[chapterIndex - 1].id;
    return completedChapters.includes(prevChapterId);
  }

  const currentChapter = chapters.find(c => c.id === activeChapter);

  return (
    <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-3.5rem)]">
      <aside className="border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold tracking-tight">Python Path</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your journey to mastery starts here.
          </p>
        </div>
        <nav className="flex-1 overflow-auto p-4 space-y-2">
          {chapters.map((chapter, index) => {
            const isUnlocked = isChapterUnlocked(chapter.id);
            const isCompleted = completedChapters.includes(chapter.id);
            const isActive = chapter.id === activeChapter;

            return (
              <button
                key={chapter.id}
                onClick={() => handleChapterChange(chapter.id)}
                disabled={!isUnlocked}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-3',
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                  !isUnlocked && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className={cn("flex items-center justify-center w-6 h-6 rounded-full border-2 text-xs font-bold shrink-0",
                  isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-muted-foreground',
                  isActive && 'border-primary-foreground'
                )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : !isUnlocked ? <Lock className="w-3 h-3"/> : index + 1}
                </div>
                <span>{chapter.title}</span>
              </button>
            )
          })}
        </nav>
      </aside>
      <div className="flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto" ref={contentRef}>
            {currentChapter && (
                <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-8 md:p-12">
                   <div dangerouslySetInnerHTML={{ __html: currentChapter.content.replace(/```python/g, '<pre><code class="language-python">').replace(/```/g, '</code></pre>') }} />
                </article>
            )}
        </div>
        <footer className="p-4 border-t bg-background/80 backdrop-blur-sm sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
               <CircularProgress progress={scrollProgress} />
               <div>
                <h3 className="font-semibold">{currentChapter?.title}</h3>
                <p className="text-sm text-muted-foreground">Scroll to complete the chapter.</p>
               </div>
            </div>
            <Button onClick={completeChapter} disabled={scrollProgress < 100}>
                {completedChapters.includes(activeChapter) ? "Chapter Complete" : "Mark as Complete"}
                <Play className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
