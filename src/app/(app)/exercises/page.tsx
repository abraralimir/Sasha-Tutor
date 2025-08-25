
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import type { GenerateCodingExerciseOutput } from '@/ai/flows/generate-coding-exercise';
import type { AssessCodeOutput } from '@/ai/flows/assess-code-exercise';
import { generateCodingExercise, assessCode } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/utils';

export default function ExercisesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState('Python');
  const [topic, setTopic] = useState('strings');
  const [difficulty, setDifficulty] = useState('easy');
  const [exercise, setExercise] = useState<GenerateCodingExerciseOutput | null>(
    null
  );
  const [assessment, setAssessment] = useState<AssessCodeOutput | null>(null);
  const [studentCode, setStudentCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setExercise(null);
    setAssessment(null);
    setStudentCode('');
    try {
      const result = await generateCodingExercise({ language, topic, difficulty });
      setExercise(result);
    } catch (error) {
      console.error('Failed to generate exercise:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAssess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise || !studentCode) return;
    setIsAssessing(true);
    setAssessment(null);
    try {
      const result = await assessCode({
        exerciseDescription: exercise.exercise,
        studentCode,
        expectedOutput: exercise.solution,
      });
      setAssessment(result);
    } catch (error) {
      console.error('Failed to assess code:', error);
    } finally {
      setIsAssessing(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI-Powered Exercises"
        description="Generate exercises in any language and get instant feedback on your code."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Generate a New Exercise</CardTitle>
              <CardDescription>
                Select a language, topic, and difficulty level to start.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="e.g., Python" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., strings" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Exercise'}
              </Button>
            </CardFooter>
          </Card>

          {isGenerating && (
            <div className="text-center p-8">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-muted-foreground">
                Sasha is generating your exercise...
              </p>
            </div>
          )}

          {exercise && (
            <Card>
              <CardHeader>
                <CardTitle>Your Challenge</CardTitle>
                <CardDescription>
                  Read the problem below and provide a one-line solution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-6">
                  <p className="font-code text-sm whitespace-pre-wrap">
                    {exercise.exercise}
                  </p>
                </div>
                <form onSubmit={handleAssess} className="space-y-4">
                  <div>
                    <Label htmlFor="student-code" className="font-semibold">
                      Your solution:
                    </Label>
                    <Input
                      id="student-code"
                      value={studentCode}
                      onChange={(e) => setStudentCode(e.target.value)}
                      placeholder="Enter your code here"
                      className="mt-2 font-code"
                      autoComplete="off"
                    />
                  </div>
                  <Button type="submit" disabled={isAssessing || !studentCode}>
                    {isAssessing && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isAssessing ? 'Assessing...' : 'Check Code'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {assessment && (
             <Alert
              className={cn(assessment.correct && "border-accent")}
              variant={assessment.correct ? 'default' : 'destructive'}
            >
              {assessment.correct ? (
                <CheckCircle className="h-4 w-4 text-accent" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle className={cn(assessment.correct && "text-accent")}>
                {assessment.correct ? 'Correct!' : 'Needs Improvement'}
              </AlertTitle>
              <AlertDescription>
                {assessment.feedback}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
    </div>
  );
}
