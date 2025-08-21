
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Check, Lock, Play, Loader2, Sparkles, Pencil, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import { explainCode, evaluatePythonCode, generatePracticeSession } from '@/lib/actions';
import type { EvaluatePythonCodeOutput } from '@/ai/flows/evaluate-python-code';
import type { GeneratePracticeSessionOutput } from '@/ai/flows/generate-practice-session';
import { getCourse, Chapter, Lesson } from '@/services/python-course-service';
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

const course = getCourse();
const chapters = course.chapters;

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
          <span className="ml-2">Run</span>
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


function ArticleWithInteractiveContent({ content }: { content: string }) {
  const parts = content.split(/<interactive-code-cell\s+description="([^"]+)"\s+expected="([^"]+)"\s*\/>/g);

  return (
    <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-8 md:p-12">
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          // This is a regular content part
          // To render code blocks with syntax highlighting, we can wrap them.
          // For now, we'll just render the HTML.
          return <div key={index} dangerouslySetInnerHTML={{ __html: part.replace(/<code>(.*?)<\/code>/gs, '<code class="font-code bg-muted px-1 rounded-sm">$1</code>') }} />;
        } else if (index % 3 === 1) {
          // This is an interactive cell
          const description = parts[index];
          const expected = parts[index + 1];
          return <InteractiveCodeCell key={index} exerciseDescription={description} expectedOutput={expected} />;
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

function EndOfLessonQuiz({ lessonTitle, onQuizComplete }: { lessonTitle: string, onQuizComplete: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [quizSession, setQuizSession] = useState<GeneratePracticeSessionOutput | null>(null);
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

    useEffect(() => {
        // Reset state if the lesson title changes.
        if (isOpen) {
            handleGenerateQuiz();
        } else {
            resetQuizState();
        }
    }, [lessonTitle, isOpen, resetQuizState]);

    const handleGenerateQuiz = useCallback(async () => {
        if (isLoading) return;
        resetQuizState();
        setIsLoading(true);
        try {
            const result = await generatePracticeSession({
                topic: lessonTitle,
                studentLevel: 'beginner',
            });
            setQuizSession(result);
        } catch (err) {
            setError('Failed to generate quiz. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [lessonTitle, isLoading, resetQuizState]);
    
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

    const isQuizComplete = quizSession && Object.values(quizAttempts).filter(a => a).length === quizSession.quiz.length;
    const currentQuestion = quizSession?.quiz[activeQuestion];
    const currentAttempt = quizAttempts[activeQuestion];

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Mark as Complete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Lesson Quiz: {lessonTitle}</DialogTitle>
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

export default function LearningPathPage({ params }: { params: { topic: string } }) {
  const [activeChapter, setActiveChapter] = useState<Chapter>(chapters[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(chapters[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
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

  const handleLessonChange = (lessonId: string) => {
    for (const chapter of chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) {
        setActiveChapter(chapter);
        setActiveLesson(lesson);
        return;
      }
    }
  };

  const completeLesson = () => {
    if (!completedLessons.includes(activeLesson.id)) {
      setCompletedLessons(prev => [...prev, activeLesson.id]);
    }
    
    const currentChapterIndex = chapters.findIndex(c => c.id === activeChapter.id);
    const currentLessonIndex = activeChapter.lessons.findIndex(l => l.id === activeLesson.id);

    if (currentLessonIndex < activeChapter.lessons.length - 1) {
      setActiveLesson(activeChapter.lessons[currentLessonIndex + 1]);
    } else if (currentChapterIndex < chapters.length - 1) {
      const nextChapter = chapters[currentChapterIndex + 1];
      setActiveChapter(nextChapter);
      setActiveLesson(nextChapter.lessons[0]);
    }
  };

  const isLessonUnlocked = (lessonId: string) => {
    // The very first lesson is always unlocked
    if (chapters[0].lessons[0].id === lessonId) return true;

    let prevLessonId: string | null = null;
    for (const chapter of chapters) {
        for (const lesson of chapter.lessons) {
            if (lesson.id === lessonId) {
                return prevLessonId === null || completedLessons.includes(prevLessonId);
            }
            prevLessonId = lesson.id;
        }
    }
    return false;
  }
  
  const totalLessons = chapters.reduce((sum, chap) => sum + chap.lessons.length, 0);
  const pathProgress = (completedLessons.length / totalLessons) * 100;

  const isCurrentLessonComplete = completedLessons.includes(activeLesson.id);
  const isFinalLesson = chapters[chapters.length-1].lessons[chapters[chapters.length-1].lessons.length-1].id === activeLesson.id;
  
  return (
    <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-3.5rem)]">
      <aside className="border-r flex flex-col bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold tracking-tight capitalize">{decodeURIComponent(params.topic)} Path</h2>
          <div className="mt-2">
             <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{width: `${pathProgress}%`}}></div>
            </div>
             <p className="text-sm text-muted-foreground mt-1 text-center">{completedLessons.length} of {totalLessons} lessons complete</p>
          </div>
        </div>
        <nav className="flex-1 overflow-auto p-4 space-y-1">
          {chapters.map((chapter) => {
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
                            <span>{lesson.title}</span>
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
      </aside>
      <div className="flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto" ref={contentRef}>
            <ArticleWithInteractiveContent content={activeLesson.content} />
        </div>
        <footer className="p-4 border-t bg-background/80 backdrop-blur-sm sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
               <CircularProgress progress={scrollProgress} />
               <div>
                <h3 className="font-semibold">{activeLesson?.title}</h3>
                <p className="text-sm text-muted-foreground">Scroll to the end and complete the quiz to continue.</p>
               </div>
            </div>
            {isCurrentLessonComplete ? (
              <Button onClick={completeLesson} disabled={isFinalLesson}>
                Next Lesson <Play className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <EndOfLessonQuiz lessonTitle={activeLesson.title} onQuizComplete={completeLesson} />
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
