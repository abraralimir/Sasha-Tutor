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
  topic: z.string().describe('The topic of the coding exercise.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the coding exercise.'),
});
export type GenerateCodingExerciseInput = z.infer<typeof GenerateCodingExerciseInputSchema>;

const GenerateCodingExerciseOutputSchema = z.object({
  exercise: z.string().describe('The generated coding exercise in Python.'),
  solution: z.string().describe('The solution to the generated coding exercise in Python.'),
});
export type GenerateCodingExerciseOutput = z.infer<typeof GenerateCodingExerciseOutputSchema>;

export async function generateCodingExercise(input: GenerateCodingExerciseInput): Promise<GenerateCodingExerciseOutput> {
  return generateCodingExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodingExercisePrompt',
  input: {schema: GenerateCodingExerciseInputSchema},
  output: {schema: GenerateCodingExerciseOutputSchema},
  prompt: `You are a coding exercise generator. Generate a coding exercise in Python based on the given topic and difficulty.

Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

Exercise:
\`\`\`
{{exercise}}
\`\`\`

Solution:
\`\`\`
{{solution}}
\`\`\``,
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
