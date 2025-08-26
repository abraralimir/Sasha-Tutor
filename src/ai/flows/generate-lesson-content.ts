
'use server';

/**
 * @fileOverview An AI agent to generate detailed lesson content for a Python topic.
 *
 * - generateLessonContent - A function that generates lesson content.
 * - GenerateLessonContentInput - The input type for the generateLessonContent function.
 * - GenerateLessonContentOutput - The return type for the generateLessonContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ContentBlockSchema } from '@/services/course-service';


const GenerateLessonContentInputSchema = z.object({
  topic: z.string().describe('The topic of the lesson.'),
  studentLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The student’s current proficiency level.'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;


const GenerateLessonContentOutputSchema = z.object({
  content: z.array(ContentBlockSchema).describe('An array of content blocks that make up the lesson.'),
});
export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;


export async function generateLessonContent(input: GenerateLessonContentInput): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: {schema: GenerateLessonContentInputSchema},
  output: {schema: GenerateLessonContentOutputSchema},
  prompt: `You are an expert educator and curriculum designer. Generate a comprehensive and engaging lesson on the given topic for a student at the specified level.

Topic: {{{topic}}}
Student Level: {{{studentLevel}}}

The lesson should be structured as a series of content blocks. It must include:
1.  A clear, concise introduction to the topic in a text block.
2.  Detailed explanations of core concepts with a friendly and encouraging tone, broken into logical text blocks.
3.  Multiple, well-commented code examples demonstrating the concepts.
4.  A concluding summary in a text block.
5.  At least one interactive coding cell. This is crucial for hands-on learning.

Make the content easy to understand, well-structured, and suitable for an interactive learning path.
For code blocks inside your text content, do NOT use markdown fences (\`\`\`). Instead, use <code>...</code> HTML tags.
`,
});

const generateLessonContentFlow = ai.defineFlow(
  {
    name: 'generateLessonContentFlow',
    inputSchema: GenerateLessonContentInputSchema,
    outputSchema: GenerateLessonContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
