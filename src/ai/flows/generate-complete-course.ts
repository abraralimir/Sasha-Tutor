
'use server';

/**
 * @fileOverview An AI agent to generate a complete course, including outline, content, and quizzes, from a single topic.
 *
 * - generateCompleteCourse - A function that handles the entire course creation process.
 * - GenerateCompleteCourseInput - The input type for the function.
 * - GenerateCompleteCourseOutput - The return type for the function (a full Course object).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generateCourse, GenerateCourseOutput } from './generate-course';
import { generateLessonContent } from './generate-lesson-content';
import { generatePracticeSession } from './generate-practice-session';
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
    console.log(`Starting complete course generation for topic: ${topic}`);

    // Step 1: Generate the course outline (chapters and lessons)
    const courseOutline = await generateCourse({ topic, userId });
    
    // Step 2: Generate content and quizzes for each lesson in parallel
    const updatedChapters = await Promise.all(
      courseOutline.chapters.map(async (chapter) => {
        const updatedLessons = await Promise.all(
          chapter.lessons.map(async (lesson) => {
            try {
              // Generate lesson content and practice session concurrently
              const [contentResult, practiceSessionResult] = await Promise.all([
                generateLessonContent({
                  topic: lesson.title,
                  studentLevel: 'beginner',
                }),
                generatePracticeSession({
                  topic: lesson.title,
                  studentLevel: 'beginner',
                }),
              ]);

              const content = Array.isArray(contentResult.content) ? contentResult.content : [];
              const quiz = Array.isArray(practiceSessionResult.quiz) ? practiceSessionResult.quiz : [];

              return { ...lesson, content, quiz };
            } catch (error) {
              console.error(`Failed to generate content/quiz for lesson "${lesson.title}":`, error);
              // Return lesson with empty content/quiz on failure
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

    const finalCourse: Course = {
      ...courseOutline,
      chapters: updatedChapters,
      showOnHomepage: false, // Default to not showing on homepage
    };

    console.log(`Finished complete course generation for: ${topic}`);
    return finalCourse;
  }
);
