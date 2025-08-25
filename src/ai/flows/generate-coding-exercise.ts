'use server';

/**
 * @fileOverview An AI agent to generate coding exercises on demand.
 *
 * - generateCodingExercise - A function that generates coding exercises.
 * - GenerateCodingExerciseInput - The input type for the generateCodingExercise function.
 * - GenerateCodingExerciseOutput - The return type for the generateCodingExercise function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodingExerciseInputSchema = z.object({
  language: z.string().describe('The programming language for the exercise.'),
  topic: z.string().describe('The topic of the coding exercise.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the coding exercise.'),
});
export type GenerateCodingExerciseInput = z.infer<typeof GenerateCodingExerciseInputSchema>;

const GenerateCodingExerciseOutputSchema = z.object({
  exercise: z.string().describe('The generated coding exercise.'),
  solution: z.string().describe('The solution to the generated coding exercise.'),
});
export type GenerateCodingExerciseOutput = z.infer<typeof GenerateCodingExerciseOutputSchema>;

export async function generateCodingExercise(input: GenerateCodingExerciseInput): Promise<GenerateCodingExerciseOutput> {
  return generateCodingExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodingExercisePrompt',
  input: {schema: GenerateCodingExerciseInputSchema},
  output: {schema: GenerateCodingExerciseOutputSchema},
  prompt: `You are a coding exercise generator. Generate a coding exercise based on the given language, topic, and difficulty.

Language: {{{language}}}
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

Provide a clear, one-sentence problem description for the exercise.

Exercise:
{{exercise}}

Solution:
{{solution}}`,
});

const generateCodingExerciseFlow = ai.defineFlow(
  {
    name: 'generateCodingExerciseFlow',
    inputSchema: GenerateCodingExerciseInputSchema,
    outputSchema: GenerateCodingExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
