import { BookOpen, Code, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';

const steps = [
  {
    href: '/resources',
    icon: BookOpen,
    title: 'Step 1: Learn the Basics',
    description: 'Start with core Python concepts. Our resource hub has simple explanations and code examples to get you started.',
    cta: 'Go to Resources',
  },
  {
    href: '/exercises',
    icon: Code,
    title: 'Step 2: Practice Your Skills',
    description: 'Apply what you\'ve learned. Generate coding exercises and get instant AI feedback to improve faster.',
    cta: 'Try Exercises',
  },
  {
    href: '/chatbot',
    icon: MessageCircle,
    title: 'Stuck? Ask our AI Chatbot',
    description: 'Don\'t hesitate to ask for help. Our AI assistant is here to answer any Python questions you have, big or small.',
    cta: 'Ask the Chatbot',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Welcome to Sasha's Python Path"
        description="Your AI-powered journey to mastering Python starts here."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Your Learning Journey</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Follow these simple steps to begin your adventure in Python programming.
                </p>
            </div>
            {steps.map((step) => (
                <Card key={step.href} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="md:flex-row md:items-start md:gap-6">
                        <div className="flex-shrink-0 mb-4 md:mb-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
                                <step.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <CardTitle>{step.title}</CardTitle>
                            <CardDescription className="pt-2 text-base">
                                {step.description}
                            </CardDescription>
                            <Link href={step.href} className='mt-4 inline-block'>
                                <Button>{step.cta}</Button>
                            </Link>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}
