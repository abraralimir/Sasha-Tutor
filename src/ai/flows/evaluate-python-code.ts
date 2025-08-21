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
  prompt: `You are an expert and friendly coding tutor. You are evaluating a student's single line of Python code.

Exercise Description: {{{exerciseDescription}}}
Student's Code: \`\`\`python
{{{code}}}
\`\`\`
Expected result (or concept to demonstrate): {{{expectedOutput}}}

Your task is to determine if the student's code is correct.
- If the code is correct and achieves the expected output, set 'correct' to true and provide encouraging feedback like "Great job!" or "Exactly right!".
- If the code is incorrect or has syntax errors, set 'correct' to false. Provide a very gentle and helpful hint to guide the student. Do NOT give them the answer directly. For example, if they wrote \`print(Hello, World!)\` instead of \`print("Hello, World!")\`, you could say: "So close! Remember that text in Python, which we call strings, needs to be wrapped in quotes."

Keep your feedback concise and positive.
`,
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
