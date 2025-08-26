
'use server';

/**
 * @fileOverview An AI agent to generate the full content for an entire course outline.
 *
 * - generateFullCourseContent - A function that takes a course structure and returns it with all lesson content populated.
 * - GenerateFullCourseContentInput - The input type for the function.
 * - GenerateFullCourseContentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { CourseSchema } from '@/services/course-service';
import { generateLessonContent } from './generate-lesson-content';
import { checkAndIncrementRateLimit } from '@/services/rate-limit-service';

export type GenerateFullCourseContentInput = z.infer<typeof CourseSchema>;
export type GenerateFullCourseContentOutput = z.infer<typeof CourseSchema>;


export async function generateFullCourseContent(input: GenerateFullCourseContentInput): Promise<GenerateFullCourseContentOutput> {
  return generateFullCourseContentFlow(input);
}

const generateFullCourseContentFlow = ai.defineFlow(
  {
    name: 'generateFullCourseContentFlow',
    inputSchema: CourseSchema,
    outputSchema: CourseSchema,
  },
  async (courseOutline) => {
    const rateLimit = await checkAndIncrementRateLimit();
    if (rateLimit.isExceeded) {
      throw new Error(rateLimit.message);
    }
    
    console.log(`Starting full course generation for: ${courseOutline.title}`);

    const updatedChapters = await Promise.all(
      courseOutline.chapters.map(async (chapter) => {
        const updatedLessons = await Promise.all(
          chapter.lessons.map(async (lesson) => {
            try {
              const lessonContent = await generateLessonContent({
                topic: lesson.title,
                studentLevel: 'beginner',
              });
              // Ensure content is an array. If the AI fails and returns something else, default to an empty array.
              const content = Array.isArray(lessonContent.content) ? lessonContent.content : [];
              return { ...lesson, content, quiz: [] }; // Ensure quiz is initialized
            } catch (error) {
              console.error(`Failed to generate content for lesson "${lesson.title}":`, error);
              // Return lesson with empty content on failure.
              return {
                ...lesson,
                content: [],
                quiz: [],
              };
            }
          })
        );
        return { ...chapter, lessons: updatedLessons };
      })
    );
    
    const finalCourse: GenerateFullCourseContentOutput = {
      ...courseOutline,
      chapters: updatedChapters,
    };

    console.log(`Finished full course generation for: ${courseOutline.title}`);
    return finalCourse;
  }
);
