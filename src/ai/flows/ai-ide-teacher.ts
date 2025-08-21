'use server';

/**
 * @fileOverview AI-powered IDE teacher flow for interactive Python learning.
 *
 * - aiIdeTeacher - A function that guides students through Python algorithms, libraries, and functions in an IDE.
 * - AiIdeTeacherInput - The input type for the aiIdeTeacher function.
 * - AiIdeTeacherOutput - The return type for the aiIdeTeacher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiIdeTeacherInputSchema = z.object({
  topic: z.string().describe('The specific Python topic, algorithm, library, or function the student wants to learn.'),
  studentLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The student\u2019s current proficiency level in Python.'),
  preferredLearningStyle: z.string().optional().describe('The student\u2019s preferred learning style (e.g., hands-on, visual, theoretical).'),
});
export type AiIdeTeacherInput = z.infer<typeof AiIdeTeacherInputSchema>;

const AiIdeTeacherOutputSchema = z.object({
  lessonContent: z.string().describe('The comprehensive lesson content, including explanations, code examples, and exercises.'),
  aiFeedback: z.string().describe('AI-generated feedback on the student\u2019s code and progress.'),
});
export type AiIdeTeacherOutput = z.infer<typeof AiIdeTeacherOutputSchema>;

export async function aiIdeTeacher(input: AiIdeTeacherInput): Promise<AiIdeTeacherOutput> {
  return aiIdeTeacherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiIdeTeacherPrompt',
  input: {schema: AiIdeTeacherInputSchema},
  output: {schema: AiIdeTeacherOutputSchema},
  prompt: `You are an expert Python teacher specializing in teaching coding in an interactive IDE environment. Your goal is to help students master Python programming by guiding them through algorithms, libraries, and functions step-by-step.

  The student wants to learn about: {{{topic}}}
  Student level: {{{studentLevel}}}
  Preferred learning style: {{{preferredLearningStyle}}}

  Provide a comprehensive lesson plan that includes:
  - Clear explanations of concepts.
  - Practical code examples.
  - Interactive exercises for the student to implement in the IDE.
  - AI-generated feedback on the student’s code and progress.
  - Step-by-step instructions.
  - Use a Apple style layout, characterized by ample whitespace, prominent typography, and content-centered design.

  Ensure that the lesson is tailored to the student’s level and learning style.
  Format the response in a way that is easily presentable in the IDE.

  Output:
  Lesson Content: The comprehensive lesson content, including explanations, code examples, and exercises.
  AI Feedback: AI-generated feedback on the student’s code and progress.
  `,
});

const aiIdeTeacherFlow = ai.defineFlow(
  {
    name: 'aiIdeTeacherFlow',
    inputSchema: AiIdeTeacherInputSchema,
    outputSchema: AiIdeTeacherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
