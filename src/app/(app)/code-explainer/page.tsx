'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { explainCode } from '@/lib/actions';
import { PageHeader } from '@/components/page-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CodeExplainerPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleExplain = async () => {
    if (!code) return;
    setIsLoading(true);
    setExplanation('');
    try {
      const result = await explainCode({ codeToExplain: code, language });
      setExplanation(result.explanation);
    } catch (error) {
      console.error('Failed to get explanation', error);
      setExplanation(
        'Sorry, an error occurred while trying to explain the code. Please try again.'
      );
    } finally {
      setIsLoading(false);
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
        title="AI Code Explainer"
        description="Your personal canvas for learning. Paste any code snippet below and get a detailed explanation from Sasha."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Your Code</h2>
            <div className='space-y-2'>
                <Label htmlFor="language">Language (optional)</Label>
                <Input 
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g., Python, JavaScript, SQL"
                />
            </div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code snippet here..."
              className="h-80 resize-none font-code text-sm"
              autoComplete="off"
            />
            <Button onClick={handleExplain} disabled={isLoading || !code}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Analyzing...' : 'Explain with AI'}
            </Button>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Sasha's Explanation</h2>
             <Card className="flex-1">
              <CardContent className="p-6">
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating explanation...</span>
                  </div>
                )}
                {!isLoading && !explanation && (
                    <div className="text-center text-muted-foreground pt-16">
                        <Bot className="mx-auto h-12 w-12" />
                        <p className="mt-2">The explanation will appear here.</p>
                    </div>
                )}
                {explanation && (
                    <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                        {explanation}
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
