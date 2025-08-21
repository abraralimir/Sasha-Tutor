// evaluate-python-code.ts
'use server';

/**
 * @fileOverview Evaluates a one-line Python code input and provides feedback on its correctness.
 *
 * - evaluatePythonCode - Function to evaluate the Python code.
 * - EvaluatePythonCodeInput - Input type for the evaluatePythonCode function.
 * - EvaluatePythonCodeOutput - Return type for the evaluatePythonCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluatePythonCodeInputSchema = z.object({
  code: z.string().describe('The one-line Python code input.'),
  exerciseDescription: z.string().describe('The description of the coding exercise.'),
  expectedOutput: z.string().describe('The expected output of the code exercise.'),
});
export type EvaluatePythonCodeInput = z.infer<typeof EvaluatePythonCodeInputSchema>;

const EvaluatePythonCodeOutputSchema = z.object({
  correct: z.boolean().describe('Whether the Python code is correct or not.'),
  feedback: z.string().describe('Feedback on the Python code, including errors and suggestions.'),
});
export type EvaluatePythonCodeOutput = z.infer<typeof EvaluatePythonCodeOutputSchema>;

export async function evaluatePythonCode(input: EvaluatePythonCodeInput): Promise<EvaluatePythonCodeOutput> {
  return evaluatePythonCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluatePythonCodePrompt',
  input: {schema: EvaluatePythonCodeInputSchema},
  output: {schema: EvaluatePythonCodeOutputSchema},
  prompt: `You are an expert coding tutor. You will evaluate the student's one-line Python code input and provide instant feedback.\n\nExercise Description: {{{exerciseDescription}}}\nStudent Code: {{{code}}}\nExpected Output: {{{expectedOutput}}}\n\nDetermine if the student code is correct. If not, provide specific feedback to help the student understand their mistakes and learn faster.\n\nConsider corner cases and provide hints.\n`,
});

const evaluatePythonCodeFlow = ai.defineFlow(
  {
    name: 'evaluatePythonCodeFlow',
    inputSchema: EvaluatePythonCodeInputSchema,
    outputSchema: EvaluatePythonCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
