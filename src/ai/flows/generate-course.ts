
'use server';

/**
 * @fileOverview An AI agent to generate a complete course outline on demand.
 * This flow includes rate limiting per user and generates content for the first lesson only.
 *
 * - generateCourse - A function that generates a course structure.
 * - GenerateCourseInput - The input type for the generateCourse function.
 * - GenerateCourseOutput - The return type for the generateCourse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { checkAndIncrementRateLimit } from '@/services/rate-limit-service';

const GenerateCourseInputSchema = z.object({
  topic: z.string().describe('The topic the user wants to learn about. e.g., "Excel", "Java", "SAP FICO"'),
  userId: z.string().describe('The unique ID of the user requesting the course.'),
});
export type GenerateCourseInput = z.infer<typeof GenerateCourseInputSchema>;

const LessonSchema = z.object({
    id: z.string().describe("A unique identifier for the lesson, e.g., 'lesson-1-1'"),
    title: z.string().describe("The title of the lesson."),
});

const ChapterSchema = z.object({
    id: z.string().describe("A unique identifier for the chapter, e.g., 'chapter-1'"),
    title: z.string().describe("The title of the chapter, often including a level like 'Level 1: Foundations'"),
    lessons: z.array(LessonSchema).describe("A list of lessons within the chapter."),
});

const GenerateCourseOutputSchema = z.object({
  id: z.string().describe("A unique identifier for the course, typically a slug version of the topic."),
  title: z.string().describe("The full title of the course, e.g., 'Mastering Excel'"),
  chapters: z.array(ChapterSchema).describe("A list of chapters that make up the course curriculum."),
});
export type GenerateCourseOutput = z.infer<typeof GenerateCourseOutputSchema>;


export async function generateCourse(input: GenerateCourseInput): Promise<GenerateCourseOutput> {
  return generateCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoursePrompt',
  input: { schema: GenerateCourseInputSchema },
  output: { schema: GenerateCourseOutputSchema },
  prompt: `You are an expert curriculum designer. A user wants to learn about a new topic and you need to generate a comprehensive, structured learning path for them.

Topic: {{{topic}}}

Your task is to create a complete course outline. The course should be broken down into logical chapters, starting from beginner concepts and progressing to advanced topics. Each chapter must contain a series of lessons.

- Create between 5 and 10 chapters.
- Each chapter should have between 3 and 7 lessons.
- The structure should be logical for a student learning from scratch.
- Ensure chapter and lesson titles are clear, concise, and descriptive.
- Generate unique, sequential IDs for each course, chapter, and lesson.
`,
});

const generateCourseFlow = ai.defineFlow(
  {
    name: 'generateCourseFlow',
    inputSchema: GenerateCourseInputSchema,
    outputSchema: GenerateCourseOutputSchema,
  },
  async ({ topic, userId }) => {
    const rateLimit = await checkAndIncrementRateLimit();
    if (rateLimit.isExceeded) {
      throw new Error(rateLimit.message);
    }

    const { output: courseOutline } = await prompt({ topic, userId });
    return courseOutline!;
  }
);
