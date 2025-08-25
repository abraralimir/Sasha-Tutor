
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Code, Table, Cloud, BarChart, Loader2, Bell, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { getCourses, Course, UserProfile, getUserProfileStream } from '@/services/course-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { seedInitialCourses } from '@/services/seed';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useFcmToken } from '@/lib/fcm';
import { AISearch } from '@/components/ai-search';


const ICONS: { [key: string]: React.ElementType } = {
  python: Code,
  excel: Table,
  'sap-fico': BookOpen,
  'cloud-learning': Cloud,
  'data-analytics': BarChart,
  default: BookOpen,
};

export default function DashboardPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { retrieveToken } = useFcmToken();

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await seedInitialCourses();

      const unsubscribeCourses = getCourses((data, err) => {
        if (!err) {
          setAllCourses(data);
        }
      });

      let unsubscribeProfile: (() => void) | null = null;
      if (user) {
        unsubscribeProfile = getUserProfileStream(user.uid, (profile) => {
          setUserProfile(profile);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
      
      return () => {
        unsubscribeCourses();
        if (unsubscribeProfile) {
            unsubscribeProfile();
        }
      };
    };
    
    initializeData();
  }, [user]);
  
  const handleStartLearning = (courseId: string) => {
      router.push(`/${courseId}/learning-path`);
  };

  const userCourses = (userProfile?.courses || [])
    .map(userCourse => {
        const courseDetails = allCourses.find(c => c.id === userCourse.courseId);
        if (!courseDetails) return null;

        const totalLessons = courseDetails.chapters.reduce((acc, chap) => acc + chap.lessons.length, 0);
        const completedLessons = userCourse.completedLessons.length;
        const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        
        return { ...courseDetails, progress, completedLessons, totalLessons };
    })
    .filter(Boolean) as (Course & { progress: number, completedLessons: number, totalLessons: number })[];


  const userName = user?.displayName?.split(' ')[0] || user?.email;

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            {user ? `Welcome back, ${userName}!` : "Your Personalized E-Learning Platform"}
          </h1>
          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            This is an interactive, AI-powered journey to master any subject. Just ask our AI in the search bar to generate a custom course for you on any topic!
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            {user && (
                <Button variant="outline" onClick={retrieveToken}>
                    <Bell className="mr-2 h-4 w-4" /> Enable Notifications
                </Button>
            )}
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mt-12 md:mt-20">
            {user && (
                <>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">My Learning Paths</h2>
                 {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : userCourses && userCourses.length > 0 ? (
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {userCourses.map(course => {
                             const Icon = ICONS[course.id] || ICONS.default;
                             return (
                                <Card key={course.id} className="hover:shadow-lg transition-shadow flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <CardTitle>{course.title}</CardTitle>
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-muted-foreground text-sm">
                                            {course.completedLessons} of {course.totalLessons} lessons completed.
                                        </p>
                                        <Progress value={course.progress} className="mt-2" />
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                         <Button className="w-full" onClick={() => handleStartLearning(course.id)}>
                                            Continue Learning
                                        </Button>
                                    </div>
                                </Card>
                             )
                        })}
                     </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Your learning path is empty</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                        Use the AI search bar to generate a course on any topic.
                        </p>
                         <div className="mt-6">
                            {/* The AISearch component is in the header, this is just a prompt */}
                            <p className="text-sm">Click the search bar in the header to begin.</p>
                        </div>
                    </div>
                )}
                </>
            )}
        </div>

      </main>
    </div>
  );
}
