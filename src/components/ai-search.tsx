
'use client';

import { useState } from 'react';
import { Bot, Loader2, Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateCourse, generateLessonContent } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { getCourse, addCourse, formatGeneratedCourse, associateCourseWithUser, updateLessonContent } from '@/services/course-service';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AISearch({ isDisabled = false }: { isDisabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || isDisabled) return;

    if (!user) {
      router.push('/login');
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const courseId = query.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    try {
      // First, check if a course exists in the global courses collection
      const existingCourse = await getCourse(courseId);

      if (existingCourse) {
        // If it exists, just associate it with the user
        await associateCourseWithUser(user.uid, existingCourse.id);
        router.push(`/${existingCourse.id}/learning-path`);
      } else {
        // If not, generate a new one
        toast({ title: "Generating Course...", description: "Your AI tutor is building a new learning path. This may take a moment." });
        
        // Step 1: Generate the course outline
        const courseOutlineResult = await generateCourse({ topic: query, userId: user.uid });
        let newCourse = formatGeneratedCourse(courseOutlineResult);
        
        // Step 2: Generate content for the very first lesson
        const firstChapter = newCourse.chapters[0];
        const firstLesson = firstChapter?.lessons[0];

        if (firstChapter && firstLesson) {
            const lessonContentResult = await generateLessonContent({ topic: firstLesson.title, studentLevel: 'beginner' });
            
            // Inject the content into the newCourse object
            newCourse.chapters[0].lessons[0].content = lessonContentResult.content;
        }

        // Step 3: Save the new course (with first lesson content) to the global collection
        await addCourse(newCourse);
        
        // Step 4: Associate the new course with the user
        await associateCourseWithUser(user.uid, newCourse.id);
        
        // Step 5: Navigate to the newly created course path
        router.push(`/${newCourse.id}/learning-path`);
      }

      setIsOpen(false);
      setQuery('');
    } catch (err: any) {
       // Display a user-friendly message for rate limit errors.
       if (err.message && err.message.includes('The daily AI quota has been reached')) {
           setError('The daily AI quota has been reached. Please try again tomorrow.');
       } else {
           setError('Sorry, something went wrong. Please try again.');
       }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const SearchButton = (
      <button
        disabled={isDisabled}
        className={cn(
          'relative inline-flex h-10 w-full max-w-xs items-center justify-start rounded-md px-4',
          'text-sm font-medium text-muted-foreground',
          'bg-background shadow-sm border border-input',
          'hover:bg-accent hover:text-accent-foreground',
          'transition-colors duration-200',
          isDisabled && 'opacity-50 cursor-not-allowed'
        )}
      >
         <div className="absolute inset-[-1px] -z-10 rounded-[inherit] bg-[conic-gradient(from_0deg_at_50%_50%,hsl(var(--primary))_0%,transparent_10%,transparent_90%,hsl(var(--primary))_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]"></div>
        <Search className="h-4 w-4 mr-2" />
        Ask AI to create a course...
      </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isDisabled ? (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {SearchButton}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Sasha is on a break. Please try again later.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ) : (
            SearchButton
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Course Generator
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Learn Java from scratch"
            />
            <Button type="submit" disabled={isLoading || !query}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 min-h-[200px]">
          {isLoading && (
            <div className="flex flex-col items-center justify-center pt-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-muted-foreground">
                Checking for courses or generating a new one...
              </p>
            </div>
          )}
          {error && (
            <div className="text-destructive p-4 bg-destructive/10 rounded-md">
              {error}
            </div>
          )}
          
          {!isLoading && !error && (
              <div className="text-center pt-8">
                <Bot className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-2 text-muted-foreground">What do you want to learn today?</p>
              </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
