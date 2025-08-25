'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Bot, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { completeNote } from '@/lib/actions';
import { PageHeader } from '@/components/page-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function WorkbookPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleAutocomplete = async () => {
    if (!notes) return;
    setIsLoading(true);
    try {
      const result = await completeNote({ text: notes });
      setNotes(prev => prev + result.completion);
      toast({
        title: "Text Completed",
        description: "Sasha has helped complete your notes.",
      });
    } catch (error) {
      console.error('Failed to get completion', error);
      toast({
        title: "Error",
        description: "Sorry, an error occurred while trying to complete the text.",
        variant: "destructive"
      });
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
        title="AI Workbook & Notes"
        description="Your personal canvas for learning. Write notes, and let Sasha help you complete your thoughts."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-semibold">My Notes</h2>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Start writing your notes here... Sasha can help you finish them!"
              className="h-96 resize-none font-body text-base"
              autoComplete="off"
            />
            <div className="flex justify-end">
                <Button onClick={handleAutocomplete} disabled={isLoading || !notes}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Thinking...' : 'Autocomplete with AI'}
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
