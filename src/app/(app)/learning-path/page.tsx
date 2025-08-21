'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Lock, Play, Loader2 } from 'lucide-react';
import { generateLessonContent } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const chapters = [
  {
    id: 'intro',
    title: 'What is Python?',
  },
  {
    id: 'hello-world',
    title: 'Hello, World!',
  },
  {
    id: 'variables',
    title: 'Variables & Data Types',
  },
  {
    id: 'functions',
    title: 'Functions',
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
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lessonContent, setLessonContent] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const fetchLessonContent = useCallback(async (chapterId: string) => {
    setIsLoadingContent(true);
    setLessonContent('');
    try {
      const chapter = chapters.find(c => c.id === chapterId);
      if (chapter) {
        const result = await generateLessonContent({ 
          topic: chapter.title,
          studentLevel: 'beginner' 
        });
        setLessonContent(result.content);
      }
    } catch (error) {
      console.error('Failed to load lesson content', error);
      setLessonContent('## Error\n\nSorry, we could not load the lesson content. Please try again later.');
    } finally {
      setIsLoadingContent(false);
      setScrollProgress(0);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, []);

  useEffect(() => {
    fetchLessonContent(activeChapter.id);
  }, [activeChapter, fetchLessonContent]);
  

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
  }, [lessonContent, handleScroll]);

  const handleChapterChange = (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if(chapter) {
      setActiveChapter(chapter);
    }
  };

  const completeChapter = () => {
    if (!completedChapters.includes(activeChapter.id)) {
      setCompletedChapters(prev => [...prev, activeChapter.id]);
    }
    const currentIndex = chapters.findIndex(c => c.id === activeChapter.id);
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

  const isCurrentChapterComplete = completedChapters.includes(activeChapter.id);
  const isFinalChapter = chapters.findIndex(c => c.id === activeChapter.id) === chapters.length - 1;

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
            const isActive = chapter.id === activeChapter.id;

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
            {isLoadingContent ? (
                 <div className="flex flex-col items-center justify-center h-full pt-20">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Preparing your lesson on "{activeChapter.title}"...</p>
                </div>
            ) : (
                <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-8 md:p-12">
                   <div dangerouslySetInnerHTML={{ __html: lessonContent.replace(/```python/g, '<pre><code class="language-python">').replace(/```/g, '</code></pre>') }} />
                </article>
            )}
        </div>
        <footer className="p-4 border-t bg-background/80 backdrop-blur-sm sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
               <CircularProgress progress={scrollProgress} />
               <div>
                <h3 className="font-semibold">{activeChapter?.title}</h3>
                <p className="text-sm text-muted-foreground">Scroll to the end to complete the chapter.</p>
               </div>
            </div>
            <Button onClick={completeChapter} disabled={scrollProgress < 100}>
                {isCurrentChapterComplete && !isFinalChapter && "Next Chapter"}
                {isCurrentChapterComplete && isFinalChapter && "Path Complete!"}
                {!isCurrentChapterComplete && "Mark as Complete"}
                {!isFinalChapter && <Play className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
