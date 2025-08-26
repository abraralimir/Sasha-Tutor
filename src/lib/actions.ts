
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
import {
    evaluatePythonCode as evaluatePythonCodeFlow,
    type EvaluatePythonCodeInput,
} from "@/ai/flows/evaluate-python-code";
import {
    generateCourse as generateCourseFlow,
    type GenerateCourseInput,
} from "@/ai/flows/generate-course";
import {
    generateLessonContent as generateLessonContentFlow,
    type GenerateLessonContentInput,
} from "@/ai/flows/generate-lesson-content";
import {
    sendNotification as sendNotificationFlow,
    type SendNotificationInput,
} from "@/ai/flows/send-notification";
import {
    completeNote as completeNoteFlow,
    type CompleteNoteInput,
} from "@/ai/flows/complete-note";
import {
    generateFullCourseContent as generateFullCourseContentFlow,
    type GenerateFullCourseContentInput,
} from "@/ai/flows/generate-full-course-content";
import {
    generateCompleteCourse as generateCompleteCourseFlow,
    type GenerateCompleteCourseInput,
} from "@/ai/flows/generate-complete-course";


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

export async function evaluatePythonCode(input: EvaluatePythonCodeInput) {
    return await evaluatePythonCodeFlow(input);
}

export async function generateCourse(input: GenerateCourseInput) {
    return await generateCourseFlow(input);
}

export async function generateFullCourseContent(input: GenerateFullCourseContentInput) {
    return await generateFullCourseContentFlow(input);
}

export async function generateLessonContent(input: GenerateLessonContentInput) {
    return await generateLessonContentFlow(input);
}

export async function sendNotification(input: SendNotificationInput) {
    return await sendNotificationFlow(input);
}

export async function completeNote(input: CompleteNoteInput) {
    return await completeNoteFlow(input);
}

export async function generateCompleteCourse(input: GenerateCompleteCourseInput) {
    return await generateCompleteCourseFlow(input);
}
