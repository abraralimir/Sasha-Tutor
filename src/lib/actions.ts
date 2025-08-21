"use server";

import {
  generateCodingExercise as generateCodingExerciseFlow,
  type GenerateCodingExerciseInput,
} from "@/ai/flows/generate-coding-exercise";
import {
  assessCode as assessCodeFlow,
  type AssessCodeInput,
} from "@/ai/flows/assess-code-exercise";
import { 
  aiChatbot as aiChatbotFlow, 
  type AIChatbotInput 
} from "@/ai/flows/ai-chatbot";
import {
  aiIdeTeacher as aiIdeTeacherFlow,
  type AiIdeTeacherInput,
} from "@/ai/flows/ai-ide-teacher";
import {
  explainCode as explainCodeFlow,
  type ExplainCodeInput,
} from "@/ai/flows/explain-code";
import {
    generatePracticeSession as generatePracticeSessionFlow,
    type GeneratePracticeSessionInput,
} from "@/ai/flows/generate-practice-session";


export async function generateCodingExercise(
  input: GenerateCodingExerciseInput
) {
  return await generateCodingExerciseFlow(input);
}

export async function assessCode(input: AssessCodeInput) {
  return await assessCodeFlow(input);
}

export async function aiChatbot(input: AIChatbotInput) {
  return await aiChatbotFlow(input);
}

export async function aiIdeTeacher(input: AiIdeTeacherInput) {
  return await aiIdeTeacherFlow(input);
}

export async function explainCode(input: ExplainCodeInput) {
    return await explainCodeFlow(input);
}

export async function generatePracticeSession(input: GeneratePracticeSessionInput) {
    return await generatePracticeSessionFlow(input);
}
