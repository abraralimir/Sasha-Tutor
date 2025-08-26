
'use server';

/**
 * @fileOverview An AI agent to generate a complete course outline from a single topic.
 *
 * - generateCompleteCourse - A function that handles the course outline creation process.
 * - GenerateCompleteCourseInput - The input type for the function.
 * - GenerateCompleteCourseOutput - The return type for the function (a Course outline object).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generateCourse } from './generate-course';
import { CourseSchema, Course } from '@/services/course-service';

const GenerateCompleteCourseInputSchema = z.object({
  topic: z.string().describe('The topic for the new course.'),
  userId: z.string().describe('The unique ID of the user requesting the course.'),
});
export type GenerateCompleteCourseInput = z.infer<typeof GenerateCompleteCourseInputSchema>;

export type GenerateCompleteCourseOutput = Course;

export async function generateCompleteCourse(input: GenerateCompleteCourseInput): Promise<GenerateCompleteCourseOutput> {
  return generateCompleteCourseFlow(input);
}

const generateCompleteCourseFlow = ai.defineFlow(
  {
    name: 'generateCompleteCourseFlow',
    inputSchema: GenerateCompleteCourseInputSchema,
    outputSchema: CourseSchema,
  },
  async ({ topic, userId }) => {
    console.log(`Starting course outline generation for topic: ${topic}`);

    // Step 1: Generate the course outline (chapters and lessons)
    const courseOutline = await generateCourse({ topic, userId });

    // Step 2: Ensure the course structure includes empty content/quiz arrays
    const finalCourse: Course = {
      ...courseOutline,
      chapters: courseOutline.chapters.map(chapter => ({
        ...chapter,
        lessons: chapter.lessons.map(lesson => ({
          ...lesson,
          content: [],
          quiz: [],
        })),
      })),
      showOnHomepage: false, // Default to not showing on homepage
    };

    console.log(`Finished course outline generation for: ${topic}`);
    return finalCourse;
  }
);
