'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Check, Lock, Play, Loader2, Sparkles, Pencil } from 'lucide-react';
import { explainCode } from '@/lib/actions';
import { getCourse, Chapter, Lesson } from '@/services/python-course-service';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
    } catch (error)
 {
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

function ArticleWithExplainers({ content }: { content: string }) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preElements = articleRef.current?.querySelectorAll('pre');
    preElements?.forEach(pre => {
        // This logic is now handled by CodeBlockExplainer.
        // The component is added manually to the content for simplicity.
        // In a real app, this might be handled by parsing markdown to React components.
    });
  }, [content]);

  // A more robust solution involves a Markdown-to-React library.
  // For this prototype, we'll dangerously set HTML and acknowledge the limitations.
  return (
    <article
      ref={articleRef}
      className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-8 md:p-12"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default function LearningPathPage() {
  const [activeChapter, setActiveChapter] = useState<Chapter>(chapters[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(chapters[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect can be used for any logic that needs to run when the article content changes.
    // For now, the CodeBlockExplainer is not dynamically injected here.
  }, [activeLesson]);

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
      // Go to next lesson in the same chapter
      setActiveLesson(activeChapter.lessons[currentLessonIndex + 1]);
    } else if (currentChapterIndex < chapters.length - 1) {
      // Go to the first lesson of the next chapter
      const nextChapter = chapters[currentChapterIndex + 1];
      setActiveChapter(nextChapter);
      setActiveLesson(nextChapter.lessons[0]);
    }
  };

  const isLessonUnlocked = (lessonId: string) => {
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
      <aside className="border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold tracking-tight">Python Path</h2>
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
            <ArticleWithExplainers content={activeLesson.content} />
        </div>
        <footer className="p-4 border-t bg-background/80 backdrop-blur-sm sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
               <CircularProgress progress={scrollProgress} />
               <div>
                <h3 className="font-semibold">{activeLesson?.title}</h3>
                <p className="text-sm text-muted-foreground">Scroll to the end to complete the lesson.</p>
               </div>
            </div>
            <Button onClick={completeLesson} disabled={scrollProgress < 100}>
                {isCurrentLessonComplete && !isFinalLesson && "Next Lesson"}
                {isCurrentLessonComplete && isFinalLesson && "Path Complete!"}
                {!isCurrentLessonComplete && "Mark as Complete"}
                {!isFinalLesson && <Play className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
