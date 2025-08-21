'use server';
/**
 * @fileOverview An AI agent to generate a practice session with a quiz and coding exercises.
 *
 * - generatePracticeSession - A function that generates a quiz and exercises.
 * - GeneratePracticeSessionInput - The input type for the function.
 * - GeneratePracticeSessionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePracticeSessionInputSchema = z.object({
  topic: z.string().describe('The topic of the Python lesson.'),
  studentLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The student’s current proficiency level in Python.'),
});
export type GeneratePracticeSessionInput = z.infer<
  typeof GeneratePracticeSessionInputSchema
>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).describe('A list of 4 possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options.'),
});

const CodingExerciseSchema = z.object({
  problem: z.string().describe('The problem statement for the coding exercise.'),
  solution: z.string().describe('The correct Python code solution.'),
  testCase: z.string().describe('A simple test case to verify the solution, e.g., an expected output.'),
});

const GeneratePracticeSessionOutputSchema = z.object({
  quiz: z
    .array(QuizQuestionSchema)
    .length(3)
    .describe('A list of 3 multiple-choice quiz questions.'),
  exercises: z
    .array(CodingExerciseSchema)
    .length(3)
    .describe('A list of 3 coding exercises.'),
});
export type GeneratePracticeSessionOutput = z.infer<
  typeof GeneratePracticeSessionOutputSchema
>;

export async function generatePracticeSession(
  input: GeneratePracticeSessionInput
): Promise<GeneratePracticeSessionOutput> {
  return generatePracticeSessionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeSessionPrompt',
  input: { schema: GeneratePracticeSessionInputSchema },
  output: { schema: GeneratePracticeSessionOutputSchema },
  prompt: `You are an expert Python educator. Generate a practice session for a student based on the provided topic and their skill level.

The practice session must include exactly:
1.  Three multiple-choice quiz questions. Each question must have four options.
2.  Three coding exercises. Each exercise must include a clear problem statement, a correct solution, and a simple test case or expected output.

Topic: {{{topic}}}
Student Level: {{{studentLevel}}}

Generate the quiz and exercises now.
`,
});

const generatePracticeSessionFlow = ai.defineFlow(
  {
    name: 'generatePracticeSessionFlow',
    inputSchema: GeneratePracticeSessionInputSchema,
    outputSchema: GeneratePracticeSessionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
