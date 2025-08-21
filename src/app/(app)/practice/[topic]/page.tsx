'use client';

import { useState, useEffect } from 'react';
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';

import { generatePracticeSession, assessCode } from '@/lib/actions';
import type { GeneratePracticeSessionOutput } from '@/ai/flows/generate-practice-session';
import type { AssessCodeOutput } from '@/ai/flows/assess-code-exercise';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type QuizAttempt = {
  selected: string;
  isCorrect: boolean;
};

export default function PracticePage({ params }: { params: { topic: string } }) {
  const [session, setSession] = useState<GeneratePracticeSessionOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('quiz');
  const [activeQuestion, setActiveQuestion] = useState(0);

  const [quizAttempts, setQuizAttempts] = useState<Record<number, QuizAttempt>>(
    {}
  );
  const [studentCode, setStudentCode] = useState('');
  const [assessment, setAssessment] = useState<AssessCodeOutput | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const result = await generatePracticeSession({
          topic: decodeURIComponent(params.topic),
          studentLevel: 'beginner', // This could be dynamic in a real app
        });
        setSession(result);
      } catch (err) {
        setError('Failed to generate a practice session. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, [params.topic]);

  const handleQuizAnswer = (questionIndex: number, selectedOption: string) => {
    if (quizAttempts[questionIndex]) return; // Already answered

    const isCorrect =
      session!.quiz[questionIndex].correctAnswer === selectedOption;
    setQuizAttempts((prev) => ({
      ...prev,
      [questionIndex]: { selected: selectedOption, isCorrect },
    }));
  };

  const handleAssess = async (e: React.FormEvent) => {
    e.preventDefault();
    const exercise = session?.exercises[activeQuestion];
    if (!exercise || !studentCode) return;
    setIsAssessing(true);
    setAssessment(null);
    setShowSolution(false);
    try {
      const result = await assessCode({
        exerciseDescription: exercise.problem,
        studentCode,
        expectedOutput: exercise.testCase,
      });
      setAssessment(result);
    } catch (error) {
      console.error('Failed to assess code:', error);
    } finally {
      setIsAssessing(false);
    }
  };

  const currentExercise = session?.exercises[activeQuestion];
  const totalQuestions = (session?.quiz.length ?? 0) + (session?.exercises.length ?? 0);
  const currentQuestionNumber = activeTab === 'quiz' ? activeQuestion + 1 : (session?.quiz.length ?? 0) + activeQuestion + 1;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Sparkles className="h-12 w-12 text-primary animate-pulse" />
        <h2 className="mt-4 text-xl font-semibold">
          Building Your Practice Session...
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your AI tutor is preparing a personalized quiz and exercises for{' '}
          <strong>{decodeURIComponent(params.topic)}</strong>.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={`Practice: ${decodeURIComponent(params.topic)}`}
        description="Test your knowledge with a quiz and apply it with coding exercises."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setActiveQuestion(0);
              setAssessment(null);
              setStudentCode('');
              setShowSolution(false);
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quiz">Quiz ({session.quiz.length} questions)</TabsTrigger>
              <TabsTrigger value="exercises">Exercises ({session.exercises.length} sets)</TabsTrigger>
            </TabsList>
            
            {/* Quiz Content */}
            <TabsContent value="quiz">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Question {activeQuestion + 1} of {session.quiz.length}
                  </CardTitle>
                  <p className="pt-2 text-lg font-medium">
                    {session.quiz[activeQuestion].question}
                  </p>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={quizAttempts[activeQuestion]?.selected}
                    onValueChange={(value) => handleQuizAnswer(activeQuestion, value)}
                    disabled={!!quizAttempts[activeQuestion]}
                    className="space-y-3"
                  >
                    {session.quiz[activeQuestion].options.map((option, i) => {
                      const attempt = quizAttempts[activeQuestion];
                      const isSelected = attempt?.selected === option;
                      const isCorrect = attempt?.isCorrect;
                      const isCorrectAnswer = session.quiz[activeQuestion].correctAnswer === option;

                      return (
                        <Label
                          key={i}
                          className={cn(
                            'flex items-center gap-3 rounded-md border p-4 cursor-pointer transition-colors',
                            attempt && isSelected && !isCorrect && 'border-destructive bg-destructive/10 text-destructive',
                            attempt && isCorrectAnswer && 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400',
                            !attempt && 'hover:bg-muted'
                          )}
                        >
                          <RadioGroupItem value={option} />
                          <span>{option}</span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                </CardContent>
                 <CardFooter className='flex justify-between items-center'>
                    <Button variant="outline" onClick={() => setActiveQuestion(p => Math.max(0, p - 1))} disabled={activeQuestion === 0}><ChevronLeft /> Prev</Button>
                    <span>Question {activeQuestion + 1} / {session.quiz.length}</span>
                    <Button onClick={() => setActiveQuestion(p => Math.min(session.quiz.length - 1, p + 1))} disabled={activeQuestion === session.quiz.length - 1}>Next <ChevronRight /></Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Exercises Content */}
            <TabsContent value="exercises">
              <Card>
                <CardHeader>
                   <CardTitle>
                    Exercise {activeQuestion + 1} of {session.exercises.length}
                  </CardTitle>
                  <CardDescription className='pt-2'>
                    {currentExercise?.problem}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-muted/50 rounded-md font-code text-sm">
                        <pre className="whitespace-pre-wrap">{`# Expected output for a sample test case:
${currentExercise?.testCase}`}</pre>
                    </div>

                    <form onSubmit={handleAssess} className="mt-6 space-y-4">
                        <div>
                        <Label htmlFor="student-code" className="font-semibold text-base">
                            Your Solution
                        </Label>
                        <div className='mt-2 p-4 border rounded-md bg-background'>
                            <Input
                                id="student-code"
                                value={studentCode}
                                onChange={(e) => setStudentCode(e.target.value)}
                                placeholder="Enter your Python code here"
                                className="font-code text-base border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
                                autoComplete="off"
                            />
                        </div>
                        </div>
                        <div className='flex gap-2'>
                            <Button type="submit" disabled={isAssessing || !studentCode}>
                                {isAssessing && <Loader2 className="animate-spin" />}
                                {isAssessing ? 'Running...' : 'Run & Check'}
                            </Button>
                             <Button type="button" variant="ghost" onClick={() => setShowSolution(s => !s)} disabled={isAssessing}>
                                <Lightbulb className="mr-2"/>
                                {showSolution ? "Hide Solution" : "Show Solution"}
                            </Button>
                        </div>
                    </form>

                    {assessment && (
                        <Alert
                        className={cn("mt-6", assessment.correct && "border-green-500")}
                        >
                        {assessment.correct ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                        <AlertTitle className={cn(assessment.correct && "text-green-600 dark:text-green-400")}>
                            {assessment.correct ? 'Correct!' : 'Needs Improvement'}
                        </AlertTitle>
                        <AlertDescription className='whitespace-pre-wrap'>
                            {assessment.feedback}
                        </AlertDescription>
                        </Alert>
                    )}

                    {showSolution && !isAssessing && (
                         <div className="mt-6">
                            <h4 className="font-semibold">Solution</h4>
                            <div className="mt-2 bg-muted p-4 rounded-md">
                                <pre className="font-code text-sm whitespace-pre-wrap">
                                    <code>{currentExercise?.solution}</code>
                                </pre>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <Button variant="outline" onClick={() => {setActiveQuestion(p => Math.max(0, p - 1)); setAssessment(null); setStudentCode(''); setShowSolution(false);}} disabled={activeQuestion === 0}><ChevronLeft /> Prev</Button>
                    <span>Exercise {activeQuestion + 1} / {session.exercises.length}</span>
                    <Button onClick={() => {setActiveQuestion(p => Math.min(session.exercises.length - 1, p + 1)); setAssessment(null); setStudentCode(''); setShowSolution(false);}} disabled={activeQuestion === session.exercises.length - 1}>Next <ChevronRight /></Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
           <div className="mt-8 text-center">
            <Link href="/learning-path">
                <Button variant="outline">
                    <ChevronLeft className="mr-2" />
                    Back to Learning Path
                </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
