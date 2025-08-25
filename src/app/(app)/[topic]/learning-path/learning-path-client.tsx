
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Check, Lock, Play, Loader2, Sparkles, Pencil, ChevronRight, AlertCircle, CheckCircle, Menu } from 'lucide-react';
import { explainCode, evaluatePythonCode, generatePracticeSession, generateLessonContent } from '@/lib/actions';
import type { EvaluatePythonCodeOutput } from '@/ai/flows/evaluate-python-code';
import type { GeneratePracticeSessionOutput } from '@/ai/flows/generate-practice-session';
import { getCourse, updateCourse, Course, Chapter, Lesson, QuizQuestion, ContentBlock, updateLessonContent } from '@/services/course-service';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';


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

function CodeBlockExplainer({ code }: { code: string }) {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleExplain = async () => {
    if (explanation) return;
    setIsLoading(true);
    try {
      const result = await explainCode({ codeToExplain: code });
      setExplanation(result.explanation);
    } catch (error) {
      console.error('Failed to get explanation', error);
      setExplanation('Sorry, I was unable to generate an explanation.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-xs h-7"
          onClick={handleExplain}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Explain with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>AI Code Explanation</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center gap-2 p-8">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating explanation...</span>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-2 whitespace-pre-wrap">
            {explanation}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InteractiveCodeCell({ exerciseDescription, expectedOutput }: { exerciseDescription: string, expectedOutput: string }) {
  const [code, setCode] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluatePythonCodeOutput | null>(null);

  const handleRunCode = async () => {
    setIsEvaluating(true);
    setEvaluation(null);
    try {
      const result = await evaluatePythonCode({
        code,
        exerciseDescription,
        expectedOutput,
      });
      setEvaluation(result);
    } catch (error) {
      console.error("Failed to evaluate code", error);
      setEvaluation({ correct: false, feedback: "An error occurred while evaluating your code." });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="my-6 p-4 border rounded-lg bg-card relative group/code-cell">
       <div className="absolute top-2 right-2 opacity-0 group-hover/code-cell:opacity-100 transition-opacity">
         <CodeBlockExplainer code={expectedOutput} />
       </div>
      <p className="text-sm text-muted-foreground mb-2">{exerciseDescription}</p>
      <div className="flex items-center gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          className="font-code text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleRunCode()}
        />
        <Button onClick={handleRunCode} disabled={isEvaluating || !code}>
          {isEvaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          <span className="ml-2 hidden sm:inline">Run</span>
        </Button>
      </div>
      {evaluation && (
        <div className="mt-4">
           <Alert variant={evaluation.correct ? 'default' : 'destructive'} className={cn(evaluation.correct && 'border-green-500')}>
            {evaluation.correct ? <Check className="h-4 w-4 text-green-500" /> : <Sparkles className="h-4 w-4" />}
            <AlertTitle className={cn(evaluation.correct && 'text-green-600')}>{evaluation.correct ? "Correct!" : "AI Feedback"}</AlertTitle>
            <AlertDescription>{evaluation.feedback}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}


function ArticleWithInteractiveContent({ contentBlocks }: { contentBlocks: ContentBlock[] }) {
  if (!contentBlocks || contentBlocks.length === 0) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-4 md:p-12">
        <p>This lesson is under construction. Please check back later!</p>
      </div>
    );
  }

  // Helper to parse markdown-like code tags into proper code blocks
  const parseContent = (htmlContent: string) => {
    const contentWithCodeBlocks = htmlContent.replace(/<code>(.*?)<\/code>/gs, (match, code) => {
        return `<pre><code class="font-code bg-muted px-2 py-1 rounded-sm">${code.trim()}</code></pre>`;
    });
    return contentWithCodeBlocks;
  };

  return (
    <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-4 md:p-12">
      {contentBlocks.map((block, index) => {
        if (block.type === 'text') {
          return <div key={index} dangerouslySetInnerHTML={{ __html: parseContent(block.content) }} />;
        }
        if (block.type === 'interactiveCode') {
          return <InteractiveCodeCell key={index} exerciseDescription={block.description} expectedOutput={block.expectedOutput} />;
        }
        return null;
      })}
    </article>
  );
}

type QuizAttempt = {
  selected: string;
  isCorrect: boolean;
};

function EndOfLessonQuiz({ lesson, onQuizComplete }: { lesson: Lesson, onQuizComplete: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [quizSession, setQuizSession] = useState<GeneratePracticeSessionOutput | { quiz: QuizQuestion[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [quizAttempts, setQuizAttempts] = useState<Record<number, QuizAttempt>>({});

    const resetQuizState = useCallback(() => {
        setQuizSession(null);
        setActiveQuestion(0);
        setQuizAttempts({});
        setError(null);
        setIsLoading(false);
    }, []);

    const handleGenerateQuiz = useCallback(async () => {
        if (isLoading) return;
        resetQuizState();
        
        if (lesson.quiz && lesson.quiz.length > 0) {
            setQuizSession({ quiz: lesson.quiz });
            return;
        }

        setIsLoading(true);
        try {
            const result = await generatePracticeSession({
                topic: lesson.title,
                studentLevel: 'beginner',
            });
            // TODO: Here you would save the generated quiz back to the lesson in Firestore
            setQuizSession(result);
        } catch (err) {
            setError('Failed to generate quiz. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [lesson, isLoading, resetQuizState]);
    
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open && !quizSession) {
            handleGenerateQuiz();
        } else if (!open) {
            resetQuizState();
        }
    };

    const handleAnswer = (selectedOption: string) => {
        if (!quizSession || quizAttempts[activeQuestion]) return;

        const isCorrect = quizSession.quiz[activeQuestion].correctAnswer === selectedOption;
        setQuizAttempts(prev => ({
            ...prev,
            [activeQuestion]: { selected: selectedOption, isCorrect },
        }));
    };

    const isQuizComplete = quizSession && Object.keys(quizAttempts).length === quizSession.quiz.length;
    const currentQuestion = quizSession?.quiz[activeQuestion];
    const currentAttempt = quizAttempts[activeQuestion];

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Mark as Complete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Lesson Quiz: {lesson.title}</DialogTitle>
                </DialogHeader>
                <div className="p-4 space-y-4 min-h-[300px]">
                    {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <p className="ml-2">Generating your quiz...</p>
                        </div>
                    )}
                    {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                    
                    {quizSession && currentQuestion && (
                        <div>
                            <p className="font-semibold text-lg mb-4">{activeQuestion + 1}. {currentQuestion.question}</p>
                            <RadioGroup
                                value={currentAttempt?.selected}
                                onValueChange={handleAnswer}
                                disabled={!!currentAttempt}
                                className="space-y-3"
                            >
                                {currentQuestion.options.map((option, i) => {
                                    const isSelected = currentAttempt?.selected === option;
                                    const isCorrectAnswer = currentQuestion.correctAnswer === option;
                                    return (
                                        <Label key={i} className={cn(
                                            'flex items-center gap-3 rounded-md border p-4 cursor-pointer transition-colors',
                                            currentAttempt && isSelected && !currentAttempt.isCorrect && 'border-destructive bg-destructive/10',
                                            currentAttempt && isCorrectAnswer && 'border-green-500 bg-green-500/10',
                                            !currentAttempt && 'hover:bg-muted'
                                        )}>
                                            <RadioGroupItem value={option} />
                                            <span>{option}</span>
                                        </Label>
                                    );
                                })}
                            </RadioGroup>
                            {currentAttempt && (
                                <Alert className="mt-4" variant={currentAttempt.isCorrect ? 'default' : 'destructive'}>
                                    {currentAttempt.isCorrect ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    <AlertTitle>{currentAttempt.isCorrect ? 'Correct!' : 'Not quite'}</AlertTitle>
                                    {!currentAttempt.isCorrect && <AlertDescription>The correct answer is: {currentQuestion.correctAnswer}</AlertDescription>}
                                </Alert>
                            )}
                        </div>
                    )}

                    {isQuizComplete && (
                        <div className='text-center py-8'>
                             <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Great job!</h3>
                            <p className="text-muted-foreground">You've passed the quiz and completed the lesson.</p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    {isQuizComplete ? (
                        <Button onClick={() => { onQuizComplete(); setIsOpen(false); }} className="w-full">
                            Continue to Next Lesson
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setActiveQuestion(p => p + 1)}
                            disabled={!currentAttempt || !quizSession || activeQuestion >= quizSession.quiz.length - 1}
                            className="w-full"
                        >
                            Next Question <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function LearningPathSidebar({ 
  topic, 
  course, 
  completedLessons, 
  activeLesson, 
  handleLessonChange, 
  isLessonUnlocked 
}: { 
  topic: string, 
  course: Course, 
  completedLessons: string[], 
  activeLesson: Lesson,
  handleLessonChange: (lessonId: string) => void, 
  isLessonUnlocked: (lessonId: string) => boolean 
}) {
  const totalLessons = course.chapters.reduce((sum, chap) => sum + chap.lessons.length, 0);
  const pathProgress = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;
  
  return (
    <>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold tracking-tight capitalize">{topic.replace(/-/g, ' ')} Path</h2>
        <div className="mt-2">
           <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{width: `${pathProgress}%`}}></div>
          </div>
           <p className="text-sm text-muted-foreground mt-1 text-center">{completedLessons.length} of {totalLessons} lessons complete</p>
        </div>
      </div>
      <nav className="flex-1 overflow-auto p-4 space-y-1">
        {course.chapters.map((chapter) => {
           const isChapterComplete = chapter.lessons.every(l => completedLessons.includes(l.id));
           return (
              <div key={chapter.id}>
                  <h3 className="mb-2 mt-4 px-3 text-sm font-semibold text-muted-foreground">{chapter.title}</h3>
                  <div className="space-y-1">
                  {chapter.lessons.map(lesson => {
                      const isUnlocked = isLessonUnlocked(lesson.id);
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isActive = lesson.id === activeLesson.id;

                      return (
                      <button
                          key={lesson.id}
                          onClick={() => handleLessonChange(lesson.id)}
                          disabled={!isUnlocked}
                          className={cn(
                          'w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-3',
                          isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                          !isUnlocked && 'opacity-50 cursor-not-allowed'
                          )}
                      >
                          <div className={cn("flex items-center justify-center w-5 h-5 rounded-full border-2 text-xs font-bold shrink-0",
                          isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-muted-foreground',
                          isActive && 'border-primary-foreground'
                          )}
                          >
                          {isCompleted ? <Check className="w-3 h-3" /> : !isUnlocked ? <Lock className="w-3 h-3"/> : <span className='text-xs'></span>}
                          </div>
                          <span className="truncate">{lesson.title}</span>
                      </button>
                      )
                  })}
                  </div>
                  {isChapterComplete && (
                     <div className="mt-2 px-3">
                       <Link href={`/practice/${encodeURIComponent(chapter.title)}`}>
                          <Button size="sm" className="w-full">
                             <Pencil className="mr-2 h-4 w-4" />
                             Practice Chapter
                          </Button>
                        </Link>
                     </div>
                  )}
              </div>
           )
          })}
      </nav>
    </>
  );
}

// Helper function to parse AI-generated markdown into structured content blocks
const parseGeneratedContent = (markdown: string): ContentBlock[] => {
    const blocks: ContentBlock[] = [];
    // Split by the interactive code cell placeholder
    const parts = markdown.split(/<interactive-code-cell\s+description="([^"]+)"\s+expected="([^"]+)"\s*\/>/g);

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (i % 3 === 0) { // This is the text content
            if (part) {
                blocks.push({ type: 'text', content: part });
            }
        } else if (i % 3 === 1) { // This is the description
            const description = part;
            const expectedOutput = parts[i + 1];
            blocks.push({ type: 'interactiveCode', description, expectedOutput });
            i++; // Skip the next part as it's the expected output
        }
    }
    return blocks;
};

export default function LearningPathClient({ topic: topicParam }: { topic: string }) {
  const topic = decodeURIComponent(topicParam);
  const [course, setCourseState] = useState<Course | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
      const fetchCourseData = async () => {
          const courseData = await getCourse(topic);
          if (courseData) {
              setCourseState(courseData);
              const firstChapter = courseData.chapters[0] ?? null;
              const firstLesson = firstChapter?.lessons[0] ?? null;
              setActiveChapter(firstChapter);
              setActiveLesson(firstLesson);
          }
      };
      fetchCourseData();
  }, [topic]);

 const handleLessonChange = useCallback(async (lessonId: string) => {
    if (!course) return;
    for (const chapter of course.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) {
        setActiveChapter(chapter);
        setActiveLesson(lesson);
        
        if (!lesson.content || lesson.content.length === 0) {
          setIsGeneratingContent(true);
          try {
            toast({ title: "Building Your Lesson...", description: "The AI is generating this content for the first time." });
            const result = await generateLessonContent({ topic: lesson.title, studentLevel: 'beginner' });
            const newContentBlocks = parseGeneratedContent(result.content);
            
            // Update the lesson content in Firestore
            await updateLessonContent(course.id, chapter.id, lesson.id, newContentBlocks);

            // Update local state to show new content immediately
            const updatedLesson = { ...lesson, content: newContentBlocks };
            setActiveLesson(updatedLesson);

            // Also update the main course state so we don't have to re-fetch
            setCourseState(prevCourse => {
                if (!prevCourse) return null;
                return {
                    ...prevCourse,
                    chapters: prevCourse.chapters.map(c => 
                        c.id === chapter.id ? {
                            ...c,
                            lessons: c.lessons.map(l => l.id === lessonId ? updatedLesson : l)
                        } : c
                    )
                };
            });

          } catch (error) {
             console.error("Failed to generate lesson content", error);
             toast({ title: "Error", description: "Could not generate lesson content.", variant: "destructive" });
             // Optionally set some error content
             setActiveLesson({...lesson, content: [{type: 'text', content: 'Sorry, we were unable to generate this lesson.'}] });
          } finally {
            setIsGeneratingContent(false);
          }
        }
        return;
      }
    }
  }, [course, toast]);

  useEffect(() => {
    // Prime the first lesson if it's not set yet
    if (course && !activeLesson) {
      const firstLesson = course.chapters[0]?.lessons[0];
      if (firstLesson) {
        handleLessonChange(firstLesson.id);
      }
    }
  }, [course, activeLesson, handleLessonChange]);
  
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
    setScrollProgress(0);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeLesson]);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      contentEl.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => contentEl.removeEventListener('scroll', handleScroll);
    }
  }, [activeLesson, handleScroll]);

  const completeLesson = () => {
    if (!activeLesson || !activeChapter || !course) return;
    
    if (!completedLessons.includes(activeLesson.id)) {
      setCompletedLessons(prev => [...prev, activeLesson.id]);
    }
    
    const chapters = course.chapters;
    const currentChapterIndex = chapters.findIndex(c => c.id === activeChapter.id);
    const currentLessonIndex = activeChapter.lessons.findIndex(l => l.id === activeLesson.id);

    if (currentLessonIndex < activeChapter.lessons.length - 1) {
      const nextLesson = activeChapter.lessons[currentLessonIndex + 1];
      handleLessonChange(nextLesson.id);
    } else if (currentChapterIndex < chapters.length - 1) {
      const nextChapter = chapters[currentChapterIndex + 1];
      const nextLesson = nextChapter.lessons[0];
      handleLessonChange(nextLesson.id);
    }
  };

  const isLessonUnlocked = (lessonId: string) => {
    if (!course || !course.chapters.length || !course.chapters[0].lessons.length) return false;
    // The very first lesson is always unlocked
    if (course.chapters[0].lessons[0].id === lessonId) return true;

    let prevLessonId: string | null = null;
    for (const chapter of course.chapters) {
        for (const lesson of chapter.lessons) {
            if (lesson.id === lessonId) {
                return prevLessonId === null || completedLessons.includes(prevLessonId);
            }
            prevLessonId = lesson.id;
        }
    }
    return false;
  }
  
  if (!course || !activeChapter || !activeLesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading your course...</p>
      </div>
    );
  }

  const isCurrentLessonComplete = completedLessons.includes(activeLesson.id);
  const isFinalLesson = course.chapters.length > 0 && 
                      course.chapters[course.chapters.length-1].lessons.length > 0 &&
                      course.chapters[course.chapters.length-1].lessons[course.chapters[course.chapters.length-1].lessons.length-1].id === activeLesson.id;
  
  return (
    <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-3.5rem)]">
      {/* Desktop Sidebar */}
      <aside className="border-r flex-col bg-card hidden md:flex">
        <LearningPathSidebar 
          topic={topic}
          course={course}
          completedLessons={completedLessons}
          activeLesson={activeLesson}
          handleLessonChange={handleLessonChange}
          isLessonUnlocked={isLessonUnlocked}
        />
      </aside>
      
      <div className="flex flex-col relative overflow-hidden">
        {/* Mobile Header */}
        <div className="p-2 border-b flex items-center justify-between md:hidden sticky top-0 bg-background z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px] flex flex-col">
               <LearningPathSidebar 
                topic={topic}
                course={course}
                completedLessons={completedLessons}
                activeLesson={activeLesson}
                handleLessonChange={handleLessonChange}
                isLessonUnlocked={isLessonUnlocked}
              />
            </SheetContent>
          </Sheet>
          <div className="text-center">
            <h3 className="font-semibold text-sm truncate">{activeLesson?.title}</h3>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto" ref={contentRef}>
            {isGeneratingContent ? (
                <div className="p-12 max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center justify-center flex-col text-center">
                        <Sparkles className="h-12 w-12 text-primary animate-pulse mb-4" />
                        <h2 className="text-2xl font-bold">Building Your Lesson...</h2>
                        <p className="text-muted-foreground">Please wait a moment while the AI generates this content.</p>
                    </div>
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            ) : activeLesson.content ? (
                <ArticleWithInteractiveContent contentBlocks={activeLesson.content} />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p>Select a lesson to get started.</p>
                </div>
            )}
        </div>
        <footer className="p-4 border-t bg-background/80 backdrop-blur-sm sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
               <CircularProgress progress={scrollProgress} />
               <div className="hidden sm:block">
                <h3 className="font-semibold">{activeLesson?.title}</h3>
                <p className="text-sm text-muted-foreground">Scroll to the end and complete the quiz to continue.</p>
               </div>
            </div>
            {isCurrentLessonComplete ? (
              <Button onClick={completeLesson} disabled={isFinalLesson}>
                Next Lesson <Play className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <EndOfLessonQuiz lesson={activeLesson} onQuizComplete={completeLesson} />
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
