
'use client';

import { useState } from 'react';
import { Bot, Loader2, Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateCourse } from '@/lib/actions';
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
import { setCourse, formatGeneratedCourse } from '@/services/python-course-service';

export function AISearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateCourse({ topic: query });
      const formattedCourse = formatGeneratedCourse(result);
      setCourse(formattedCourse); // Store the generated course
      const courseId = formattedCourse.id.toLowerCase().replace(/\s+/g, '-');
      router.push(`/${courseId}/learning-path`);
      setIsOpen(false);
      setQuery('');
    } catch (err) {
      setError('Sorry, something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'relative inline-flex h-10 w-full max-w-xs items-center justify-start rounded-md px-4',
            'text-sm font-medium text-muted-foreground',
            'bg-background shadow-sm border border-input',
            'hover:bg-accent hover:text-accent-foreground',
            'transition-colors duration-200'
          )}
        >
           <div className="absolute inset-[-1px] -z-10 rounded-[inherit] bg-[conic-gradient(from_0deg_at_50%_50%,hsl(var(--primary))_0%,transparent_10%,transparent_90%,hsl(var(--primary))_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]"></div>
          <Search className="h-4 w-4 mr-2" />
          Ask AI to create a course...
        </button>
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
                Generating your custom learning path...
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
