import {
  BookOpen,
  Code,
  MessageCircle,
  Notebook,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';

const features = [
  {
    href: '/exercises',
    icon: Code,
    title: 'AI-Powered Exercises',
    description: 'Generate and solve coding exercises with instant AI feedback.',
  },
  {
    href: '/ide-teacher',
    icon: Terminal,
    title: 'AI IDE Teacher',
    description: 'Learn algorithms and libraries with an AI-powered teacher.',
  },
  {
    href: '/chatbot',
    icon: MessageCircle,
    title: 'AI Chatbot',
    description: 'Ask any Python-related question and get instant help from AI.',
  },
  {
    href: '/resources',
    icon: BookOpen,
    title: 'Python Resource Hub',
    description: 'Explore curated learning materials and examples.',
  },
  {
    href: '/jupyter-path',
    icon: Notebook,
    title: 'Jupyter Exercises',
    description: 'Engage with interactive, line-by-line Python exercises.',
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.href}>
              <Card className="h-full hover:bg-muted/50 transition-colors duration-200 hover:shadow-lg">
                <CardHeader>
                  <feature.icon className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="pt-1">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
