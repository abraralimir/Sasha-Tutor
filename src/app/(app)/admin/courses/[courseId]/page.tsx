
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, Plus, Trash, Loader2, Code, FileText } from 'lucide-react';
import { getCourse, addCourse, updateCourse, Course, ContentBlock } from '@/services/course-service';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const contentBlockSchema = z.object({
  type: z.enum(['text', 'interactiveCode']),
  content: z.string().optional(),
  description: z.string().optional(),
  expectedOutput: z.string().optional(),
}).refine(data => {
    if (data.type === 'text') return !!data.content;
    if (data.type === 'interactiveCode') return !!data.description && !!data.expectedOutput;
    return false;
}, {
    message: 'Required fields are missing for the selected block type.'
});


const lessonSchema = z.object({
  id: z.string().default(() => `lesson-${Date.now()}-${Math.random()}`),
  title: z.string().min(1, 'Lesson title is required.'),
  content: z.array(contentBlockSchema).optional().default([]),
});

const chapterSchema = z.object({
  id: z.string().default(() => `chapter-${Date.now()}-${Math.random()}`),
  title: z.string().min(1, 'Chapter title is required.'),
  lessons: z.array(lessonSchema),
});

const courseSchema = z.object({
  title: z.string().min(3, 'Course title must be at least 3 characters.'),
  chapters: z.array(chapterSchema),
  showOnHomepage: z.boolean().default(false),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function CourseEditPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const courseId = params.courseId as string;
  const isNewCourse = courseId === 'new';

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      chapters: [],
      showOnHomepage: false,
    },
  });

  const { fields: chapterFields, append: appendChapter, remove: removeChapter } = useFieldArray({
    control: form.control,
    name: 'chapters',
  });

  const loadCourse = useCallback(async () => {
    if (isNewCourse) {
      setIsPageLoading(false);
      return;
    }
    try {
      const courseData = await getCourse(courseId);
      if (courseData) {
        form.reset(courseData);
      } else {
        toast({ title: 'Error', description: 'Course not found.', variant: 'destructive' });
        router.push('/admin');
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to load course.', variant: 'destructive' });
    } finally {
      setIsPageLoading(false);
    }
  }, [courseId, isNewCourse, router, toast, form]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  const onSubmit = async (data: CourseFormData) => {
    try {
      if (isNewCourse) {
        const newCourseId = await addCourse(data);
        toast({ title: 'Success', description: 'Course created successfully.' });
        router.push(`/admin`);
      } else {
        await updateCourse(courseId, data);
        toast({ title: 'Success', description: 'Course updated successfully.' });
        router.push('/admin');
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to save course.', variant: 'destructive' });
    }
  };

  if (isPageLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin h-8 w-8" /></div>;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={isNewCourse ? 'Create a New Course' : 'Edit Course'}
        description="Manage course details, chapters, and lessons."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={() => router.push('/admin')} className="mb-4">
            <ChevronLeft className="mr-2" /> Back to Dashboard
          </Button>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mastering Python" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="showOnHomepage"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Show on Homepage</FormLabel>
                          <CardDescription>
                            Enable this to feature the course on the main landing page.
                          </CardDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <div>
                            <CardTitle>Curriculum</CardTitle>
                            <CardDescription>Add and manage chapters and lessons.</CardDescription>
                        </div>
                         <Button type="button" variant="outline" onClick={() => appendChapter({ id: `chapter-${Date.now()}`, title: '', lessons: [] })}>
                            <Plus className="mr-2" /> Add Chapter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" className="w-full">
                    {chapterFields.map((chapter, chapterIndex) => (
                        <AccordionItem value={chapter.id} key={chapter.id}>
                        <AccordionTrigger>
                             <div className='flex items-center w-full pr-4'>
                                <span className='font-bold mr-2'>Chapter {chapterIndex + 1}:</span>
                                {form.watch(`chapters.${chapterIndex}.title`) || "New Chapter"}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='p-4 bg-muted/50 rounded-md'>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`chapters.${chapterIndex}.title`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chapter Title</FormLabel>
                                        <FormControl>
                                        <Input placeholder="e.g., Introduction to Python" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <LessonsArray chapterIndex={chapterIndex} />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeChapter(chapterIndex)}>
                                    <Trash className="mr-2" /> Delete Chapter
                                </Button>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                   {form.formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
                  Save Course
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}


function LessonsArray({ chapterIndex }: { chapterIndex: number }) {
  const { control } = useFormContext<CourseFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.lessons`,
  });

  return (
    <div className='space-y-4 pt-4'>
        <Separator />
        <div className='flex justify-between items-center'>
             <h4 className="font-semibold">Lessons</h4>
             <Button type="button" size="sm" onClick={() => append({ id: `lesson-${Date.now()}`, title: '', content: [] })}>
                <Plus className="mr-2" /> Add Lesson
            </Button>
        </div>
      {fields.map((lesson, lessonIndex) => (
        <Card key={lesson.id} className='bg-background'>
            <CardContent className='p-4'>
                <div className='flex justify-between items-start mb-4'>
                     <p className='font-medium pt-2'>Lesson {lessonIndex + 1}</p>
                     <Button type="button" variant="ghost" size="icon" onClick={() => remove(lessonIndex)}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
                <div className='space-y-4'>
                    <FormField
                        control={control}
                        name={`chapters.${chapterIndex}.lessons.${lessonIndex}.title`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lesson Title</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Variables and Data Types" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <LessonContentArray chapterIndex={chapterIndex} lessonIndex={lessonIndex} />
                </div>
            </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LessonContentArray({ chapterIndex, lessonIndex }: { chapterIndex: number, lessonIndex: number }) {
    const { control, watch } = useFormContext<CourseFormData>();
    const { fields, append, remove } = useFieldArray({
      control,
      name: `chapters.${chapterIndex}.lessons.${lessonIndex}.content`,
    });

    return (
        <div className="space-y-4 pt-4">
            <Separator />
            <div className="flex justify-between items-center">
                <h5 className="font-semibold">Lesson Content Blocks</h5>
                <div className='flex gap-2'>
                    <Button type="button" size="sm" variant="outline" onClick={() => append({ type: 'text', content: '' })}>
                        <FileText className="mr-2" /> Add Text
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => append({ type: 'interactiveCode', description: '', expectedOutput: '' })}>
                        <Code className="mr-2" /> Add Code Cell
                    </Button>
                </div>
            </div>
            {fields.map((field, index) => {
                const blockType = watch(`chapters.${chapterIndex}.lessons.${lessonIndex}.content.${index}.type`);
                return (
                    <Card key={field.id} className="bg-muted/50 p-4">
                        <div className='flex justify-between items-start mb-4'>
                            <p className='font-medium pt-2 capitalize'>
                                {`Block ${index + 1}`}
                            </p>
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                         <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content.${index}.type`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Block Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a block type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="text">Text</SelectItem>
                                            <SelectItem value="interactiveCode">Interactive Code</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {blockType === 'text' && (
                            <FormField
                                control={control}
                                name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content.${index}.content`}
                                render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Text Content (Markdown)</FormLabel>
                                    <FormControl>
                                    <Textarea rows={5} placeholder="Write your lesson content here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        )}
                        {blockType === 'interactiveCode' && (
                            <div className="space-y-4 mt-4">
                                <FormField
                                    control={control}
                                    name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content.${index}.description`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Exercise Description</FormLabel>
                                        <FormControl>
                                        <Input placeholder="A clear, simple instruction for the student" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content.${index}.expectedOutput`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expected Answer (Code)</FormLabel>
                                        <FormControl>
                                        <Input placeholder="The exact, single-line of code that is the correct answer" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </Card>
                )
            })}
        </div>
    )
}

    