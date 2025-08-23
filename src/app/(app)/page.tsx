
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Code, Table, Cloud, BarChart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getCourses, addCourse, Course } from '@/services/course-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { seedInitialCourses } from '@/services/seed';


const ICONS: { [key: string]: React.ElementType } = {
  python: Code,
  excel: Table,
  'sap-fico': BookOpen,
  'cloud-learning': Cloud,
  'data-analytics': BarChart,
  default: BookOpen,
};

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCourses = async () => {
      setIsLoading(true);
      // Seed initial courses if they don't exist
      await seedInitialCourses();

      const unsubscribe = getCourses((data, err) => {
        if (!err) {
          setCourses(data);
        }
        setIsLoading(false);
      });
      return () => unsubscribe();
    };
    
    initializeCourses();
  }, []);
  
  const featuredCourses = courses.filter(course => course.showOnHomepage);

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
        </div>
        
        <div className="max-w-5xl mx-auto mt-12 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Explore Learning Paths</h2>
            {isLoading ? (
                 <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {featuredCourses.map(course => {
                        const Icon = ICONS[course.id] || ICONS.default;
                        return (
                            <Card key={course.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Icon className="w-10 h-10 text-primary" />
                                    <CardTitle>{course.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {course.chapters.length} chapters to build your skills from the ground up.
                                    </p>
                                    <Link href={`/${course.id}/learning-path`} className="mt-4 inline-block">
                                        <Button variant="outline">
                                            Start Learning
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
