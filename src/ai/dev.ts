import { config } from 'dotenv';
config();

import '@/ai/flows/ai-chatbot.ts';
import '@/ai/flows/ai-ide-teacher.ts';
import '@/ai/flows/assess-code-exercise.ts';
import '@/ai/flows/generate-coding-exercise.ts';
import '@/ai/flows/evaluate-python-code.ts';
import '@/ai/flows/generate-python-exercise.ts';
import '@/ai/flows/generate-lesson-content.ts';
