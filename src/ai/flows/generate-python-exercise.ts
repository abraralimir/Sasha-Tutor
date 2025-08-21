// generate-python-exercise.ts
'use server';

/**
 * @fileOverview An AI agent to generate Python exercises on demand, tailored for a specific lesson.
 *
 * - generatePythonExercise - A function that generates Python exercises.
 * - GeneratePythonExerciseInput - The input type for the generatePythonExercise function.
 * - GeneratePythonExerciseOutput - The return type for the generatePythonExercise function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePythonExerciseInputSchema = z.object({
  lessonTopic: z.string().describe('The topic of the current Python lesson.'),
  studentLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The student\u2019s current proficiency level in Python.'),
});
export type GeneratePythonExerciseInput = z.infer<typeof GeneratePythonExerciseInputSchema>;

const GeneratePythonExerciseOutputSchema = z.object({
  exercise: z.string().describe('The generated coding exercise in Python, tailored to the lesson topic.'),
  solution: z.string().describe('The solution to the generated coding exercise in Python.'),
});
export type GeneratePythonExerciseOutput = z.infer<typeof GeneratePythonExerciseOutputSchema>;

export async function generatePythonExercise(input: GeneratePythonExerciseInput): Promise<GeneratePythonExerciseOutput> {
  return generatePythonExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePythonExercisePrompt',
  input: {schema: GeneratePythonExerciseInputSchema},
  output: {schema: GeneratePythonExerciseOutputSchema},
  prompt: `You are a coding exercise generator. Generate a coding exercise in Python based on the given lesson topic and student level.

Lesson Topic: {{{lessonTopic}}}
Student Level: {{{studentLevel}}}

Exercise:
\`\`\`
{{exercise}}
\`\`\`

Solution:
\`\`\`
{{solution}}
\`\`\``,
});

const generatePythonExerciseFlow = ai.defineFlow(
  {
    name: 'generatePythonExerciseFlow',
    inputSchema: GeneratePythonExerciseInputSchema,
    outputSchema: GeneratePythonExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
