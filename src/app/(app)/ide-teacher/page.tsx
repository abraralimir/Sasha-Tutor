'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2 } from 'lucide-react';

import { aiIdeTeacher } from '@/lib/actions';
import type { AiIdeTeacherOutput } from '@/ai/flows/ai-ide-teacher';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
  studentLevel: z.enum(['beginner', 'intermediate', 'advanced']),
});

export default function IdeTeacherPage() {
  const [lesson, setLesson] = useState<AiIdeTeacherOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      studentLevel: 'beginner',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLesson(null);
    try {
      const result = await aiIdeTeacher(values);
      setLesson(result);
    } catch (error) {
      console.error("Failed to get lesson from AI.", error);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI IDE Teacher"
        description="Learn any Python topic with a personalized lesson from your AI tutor."
      />
      <div className="flex-1 overflow-hidden">
        <div className="grid lg:grid-cols-3 h-full">
          <div className="lg:col-span-1 p-6 bg-card lg:border-r">
            <h2 className="text-xl font-semibold">Lesson Settings</h2>
            <p className="text-muted-foreground mt-1 mb-6">
              Tell the AI what you want to learn.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Python decorators" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a Python algorithm, library, or function.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Level</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your proficiency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Generating Lesson...' : 'Start Learning'}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="lg:col-span-2 h-full flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-6">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full pt-20">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Your AI teacher is preparing your lesson...</p>
                </div>
              )}
              {!isLoading && !lesson && (
                 <div className="flex flex-col items-center justify-center h-full pt-20 text-center">
                    <Bot className="h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mt-4 text-xl font-semibold">Ready to learn?</h3>
                    <p className="mt-1 text-muted-foreground">Fill out the form to generate your personalized Python lesson.</p>
                </div>
              )}
              {lesson && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Lesson Content</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none whitespace-pre-wrap">
                      {lesson.lessonContent}
                    </CardContent>
                  </Card>
                  <Separator />
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Feedback & Guidance</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none whitespace-pre-wrap">
                      {lesson.aiFeedback}
                    </CardContent>
                  </Card>
                </div>
              )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
