import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            The Path to Python Mastery
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            An interactive, AI-powered journey from the fundamentals to advanced
            concepts. Start learning, practice with exercises, and get instant
            feedback.
          </p>
          <div className="mt-8">
            <Link href="/learning-path">
              <Button size="lg">
                Start Your Journey
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
