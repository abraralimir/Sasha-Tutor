
'use server';

/**
 * @fileOverview An AI agent to autocomplete or expand upon user-written notes.
 *
 * - completeNote - A function that continues writing from the user's text.
 * - CompleteNoteInput - The input type for the completeNote function.
 * - CompleteNoteOutput - The return type for the completeNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompleteNoteInputSchema = z.object({
  text: z.string().describe('The existing text or notes written by the user.'),
});
export type CompleteNoteInput = z.infer<typeof CompleteNoteInputSchema>;

const CompleteNoteOutputSchema = z.object({
  completion: z.string().describe('The AI-generated text to be appended to the user\'s notes.'),
});
export type CompleteNoteOutput = z.infer<typeof CompleteNoteOutputSchema>;

export async function completeNote(input: CompleteNoteInput): Promise<CompleteNoteOutput> {
  return completeNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'completeNotePrompt',
  input: {schema: CompleteNoteInputSchema},
  output: {schema: CompleteNoteOutputSchema},
  prompt: `You are an intelligent note-taking assistant named Sasha. A user has started writing some notes and has asked you to continue their thought or expand on the topic.

Continue writing from where the user left off. Your response should be a natural continuation of their text. Do not repeat the user's original text in your response.

User's notes:
---
{{{text}}}
---
`,
});

const completeNoteFlow = ai.defineFlow(
  {
    name: 'completeNoteFlow',
    inputSchema: CompleteNoteInputSchema,
    outputSchema: CompleteNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
