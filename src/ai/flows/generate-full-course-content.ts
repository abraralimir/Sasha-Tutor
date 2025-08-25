
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
import { ChapterSchema, LessonSchema, CourseSchema } from '@/services/course-service';


// We only need the structure, not the content, for the input.
const LessonOutlineSchema = LessonSchema.omit({ content: true, quiz: true });
const ChapterOutlineSchema = ChapterSchema.omit({ lessons: true }).extend({
    lessons: z.array(LessonOutlineSchema)
});
const GenerateFullCourseContentInputSchema = CourseSchema.omit({ chapters: true }).extend({
    chapters: z.array(ChapterOutlineSchema)
});
export type GenerateFullCourseContentInput = z.infer<typeof GenerateFullCourseContentInputSchema>;


const GenerateFullCourseContentOutputSchema = CourseSchema;
export type GenerateFullCourseContentOutput = z.infer<typeof GenerateFullCourseContentOutputSchema>;


export async function generateFullCourseContent(input: GenerateFullCourseContentInput): Promise<GenerateFullCourseContentOutput> {
  return generateFullCourseContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFullCourseContentPrompt',
  input: { schema: GenerateFullCourseContentInputSchema },
  output: { schema: GenerateFullCourseContentOutputSchema },
  prompt: `You are an expert curriculum designer and educator named Sasha. Your task is to take a given course outline and generate comprehensive content for every single lesson.

Course Title: {{{title}}}

For each lesson in each chapter, you must generate engaging and educational content in Markdown format. The content for each lesson must include:
1.  A clear, concise introduction to the topic.
2.  Detailed explanations of core concepts with a friendly and encouraging tone.
3.  Multiple, well-commented code examples demonstrating the concepts.
4.  A concluding summary.
5.  At least one interactive coding cell placeholder using the format: <interactive-code-cell description="[A clear, simple instruction for the student]" expected="[The exact, single-line of code that is the correct answer]" />. This is crucial for hands-on learning.

Make the content for each lesson easy to understand, well-structured, and suitable for an interactive learning path.
For code blocks, do NOT use markdown fences (\`\`\`). Instead, use <code>...</code> HTML tags.

Return the complete course object, with the generated content added to each lesson.

Course Structure to be filled:
---
{{{JSON.stringify chapters}}}
---
`,
});

const generateFullCourseContentFlow = ai.defineFlow(
  {
    name: 'generateFullCourseContentFlow',
    inputSchema: GenerateFullCourseContentInputSchema,
    outputSchema: GenerateFullCourseContentOutputSchema,
  },
  async (input) => {
    console.log(`Starting full course generation for: ${input.title}`);
    const { output } = await prompt(input);
    console.log(`Finished full course generation for: ${input.title}`);

    if (!output) {
        throw new Error("Failed to generate full course content.");
    }
    
    // The AI might not perfectly structure the content into the ContentBlock format.
    // We need to parse it manually.
    const parseGeneratedContent = (markdown: string | undefined) => {
        if (!markdown) return [];
        const blocks: any[] = [];
        const parts = markdown.split(/<interactive-code-cell\s+description="([^"]+)"\s+expected="([^"]+)"\s*\/>/g);

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (i % 3 === 0) {
                if (part) blocks.push({ type: 'text', content: part });
            } else if (i % 3 === 1) {
                const description = part;
                const expectedOutput = parts[i + 1];
                blocks.push({ type: 'interactiveCode', description, expectedOutput });
                i++;
            }
        }
        return blocks;
    };
    
    // Ensure the output has the correct structure with parsed content blocks.
    const finalCourse = {
        ...output,
        chapters: output.chapters.map(chapter => ({
            ...chapter,
            lessons: chapter.lessons.map(lesson => ({
                ...lesson,
                // @ts-ignore - The AI returns content as a single string, we parse it.
                content: parseGeneratedContent(lesson.content as string),
            }))
        }))
    };

    return finalCourse;
  }
);
