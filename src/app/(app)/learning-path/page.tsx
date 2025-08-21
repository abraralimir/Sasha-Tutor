
'use client';
import { redirect } from 'next/navigation';

export default function LearningPathRedirectPage() {
  // Redirect to the default python learning path
  redirect('/python/learning-path');
  
  return null;
}
