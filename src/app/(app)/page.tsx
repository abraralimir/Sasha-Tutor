
import { ArrowRight, BookOpen, Bot, Code, Table, Cloud, BarChart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const featuredCourses = [
  {
    title: 'Python',
    description: 'Master Python with interactive lessons, from basics to advanced topics.',
    icon: Code,
    href: '/python/learning-path',
    color: 'text-blue-500',
  },
  {
    title: 'Excel',
    description: 'Learn spreadsheet magic, from formulas to data visualization.',
    icon: Table,
    href: '#', // Placeholder
    color: 'text-green-500',
  },
  {
    title: 'SAP FICO',
    description: 'Understand financial accounting and reporting with SAP.',
    icon: BookOpen,
    href: '#', // Placeholder
    color: 'text-orange-500',
  },
  {
    title: 'Cloud Learning',
    description: 'Explore cloud platforms like AWS, Azure, and Google Cloud.',
    icon: Cloud,
    href: '#',
    color: 'text-sky-500',
  },
  {
    title: 'Data Analytics',
    description: 'Turn data into insights with SQL, Python, and visualization tools.',
    icon: BarChart,
    href: '#',
    color: 'text-purple-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            Your Personalized E-Learning Platform
          </h1>
          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            This is an interactive, AI-powered journey to master any subject. Just ask our AI in the search bar above to generate a custom course for you on any topic!
          </p>
           <div className="mt-8 flex justify-center gap-4">
            <Link href="/python/learning-path">
              <Button size="lg">
                Start Learning Python
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mt-12 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Or explore our featured learning paths</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {featuredCourses.map(course => (
                     <Card key={course.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <course.icon className={`w-10 h-10 ${course.color}`} />
                            <CardTitle>{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{course.description}</p>
                             <Link href={course.href} className="mt-4 inline-block">
                                <Button variant="outline" disabled={course.href === '#'}>
                                    {course.href === '#' ? 'Coming Soon' : 'Start Learning'}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
