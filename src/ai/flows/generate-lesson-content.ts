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

const GenerateLessonContentInputSchema = z.object({
  topic: z.string().describe('The topic of the Python lesson.'),
  studentLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The student’s current proficiency level in Python.'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;

const GenerateLessonContentOutputSchema = z.object({
  content: z.string().describe('The generated lesson content in Markdown format.'),
});
export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;

export async function generateLessonContent(input: GenerateLessonContentInput): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: {schema: GenerateLessonContentInputSchema},
  output: {schema: GenerateLessonContentOutputSchema},
  prompt: `You are an expert Python educator. Generate a comprehensive and engaging lesson on the given topic for a student at the specified level.

Topic: {{{topic}}}
Student Level: {{{studentLevel}}}

The lesson should be in Markdown format. It must include:
1.  A clear, concise introduction to the topic.
2.  Detailed explanations of core concepts.
3.  Multiple, well-commented code examples demonstrating the concepts.
4.  A concluding summary.

Make the content easy to understand, well-structured, and suitable for an interactive learning path.
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
