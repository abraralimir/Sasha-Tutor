// assess-code-exercise.ts
'use server';

/**
 * @fileOverview Assesses a one-line code input against a generated coding exercise and provides feedback.
 *
 * - assessCode - Function to assess the code exercise.
 * - AssessCodeInput - Input type for the assessCode function.
 * - AssessCodeOutput - Return type for the assessCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessCodeInputSchema = z.object({
  exerciseDescription: z.string().describe('The description of the coding exercise.'),
  studentCode: z.string().describe('The student\u2019s one-line code input.'),
  expectedOutput: z.string().describe('The expected output of the code exercise.'),
});
export type AssessCodeInput = z.infer<typeof AssessCodeInputSchema>;

const AssessCodeOutputSchema = z.object({
  correct: z.boolean().describe('Whether the student code is correct or not.'),
  feedback: z.string().describe('Feedback on the student\u2019s code, including errors and suggestions.'),
});
export type AssessCodeOutput = z.infer<typeof AssessCodeOutputSchema>;

export async function assessCode(input: AssessCodeInput): Promise<AssessCodeOutput> {
  return assessCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessCodePrompt',
  input: {schema: AssessCodeInputSchema},
  output: {schema: AssessCodeOutputSchema},
  prompt: `You are an expert coding tutor. You will assess the student's one-line code input against the coding exercise and provide instant feedback.

Exercise Description: {{{exerciseDescription}}}
Student Code: {{{studentCode}}}
Expected Output: {{{expectedOutput}}}

Determine if the student code is correct. If not, provide specific feedback to help the student understand their mistakes and learn faster.

Consider corner cases and provide hints.
`,
});

const assessCodeFlow = ai.defineFlow(
  {
    name: 'assessCodeFlow',
    inputSchema: AssessCodeInputSchema,
    outputSchema: AssessCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
