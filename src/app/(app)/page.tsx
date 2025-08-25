
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Code, Table, Cloud, BarChart, Loader2, Bell, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getCourses, Course, UserProfile, getUserProfileStream, removeCourseFromUserProfile } from '@/services/course-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { seedInitialCourses } from '@/services/seed';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useFcmToken } from '@/lib/fcm';
import { useToast } from '@/hooks/use-toast';


const ICONS: { [key: string]: React.ElementType } = {
  python: Code,
  excel: Table,
  'sap-fico': BookOpen,
  'cloud-learning': Cloud,
  'data-analytics': BarChart,
  default: BookOpen,
};

function CourseCard({ course, progress, completedLessons, totalLessons, onStart, onRemove }: {
  course: Course;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  onStart: (courseId: string) => void;
  onRemove?: (courseId: string) => void;
}) {
  const Icon = ICONS[course.id] || ICONS.default;
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  const handleRemove = () => {
    if (onRemove) {
        onRemove(course.id);
    }
    setIsAlertOpen(false);
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{course.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Icon className="w-8 h-8 text-primary" />
              {onRemove && (
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsAlertOpen(true)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove from Path
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          {progress !== undefined && totalLessons !== undefined && completedLessons !== undefined ? (
            <>
              <p className="text-muted-foreground text-sm">
                {completedLessons} of {totalLessons} lessons completed.
              </p>
              <Progress value={progress} className="mt-2" />
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              {course.chapters.reduce((acc, chap) => acc + chap.lessons.length, 0)} lessons to master.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => onStart(course.id)}>
            {progress !== undefined && progress > 0 ? 'Continue Learning' : 'Start Learning'} <ArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the course and your progress from your learning path. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


export default function DashboardPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { retrieveToken } = useFcmToken();
  const { toast } = useToast();

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await seedInitialCourses();

      const unsubscribeCourses = getCourses((data, err) => {
        if (!err) {
          setAllCourses(data.filter(c => c.showOnHomepage));
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

  const handleRemoveCourse = async (courseId: string) => {
    if (!user) return;
    try {
        await removeCourseFromUserProfile(user.uid, courseId);
        toast({
            title: "Course Removed",
            description: "The course has been removed from your learning path.",
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to remove the course. Please try again.",
            variant: "destructive"
        });
        console.error("Failed to remove course", error);
    }
  };

  const userCourses = (userProfile?.courses || [])
    .map(userCourse => {
        const courseDetails = allCourses.find(c => c.id === userCourse.courseId);
        if (!courseDetails) {
            // This can happen if a course is deleted by an admin but still in user's profile
            // We could fetch the course details individually here if needed
            return null;
        };

        const totalLessons = courseDetails.chapters.reduce((acc, chap) => acc + chap.lessons.length, 0);
        const completedLessons = userCourse.completedLessons.length;
        const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        
        return { ...courseDetails, progress, completedLessons, totalLessons };
    })
    .filter(Boolean) as (Course & { progress: number, completedLessons: number, totalLessons: number })[];
  
  const featuredCourses = allCourses.filter(c => c.showOnHomepage);

  const userName = user?.displayName?.split(' ')[0] || user?.email;

  if (isLoading) {
    return (
       <div className="flex justify-center items-center h-[calc(100vh-3.5rem)]">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
    )
  }

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
        
        <div className="max-w-5xl mx-auto mt-12 md:mt-16 space-y-16">
            {user && userCourses.length > 0 && (
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">My Learning Paths</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {userCourses.map(course => (
                        <CourseCard 
                            key={course.id}
                            course={course}
                            progress={course.progress}
                            completedLessons={course.completedLessons}
                            totalLessons={course.totalLessons}
                            onStart={handleStartLearning}
                            onRemove={handleRemoveCourse}
                        />
                    ))}
                    </div>
                </section>
            )}

            {featuredCourses.length > 0 && (
                 <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Courses</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {featuredCourses.map(course => (
                            <CourseCard 
                                key={course.id}
                                course={course}
                                onStart={handleStartLearning}
                            />
                        ))}
                    </div>
                </section>
            )}

            {user && userCourses.length === 0 && (
                 <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Your learning path is empty</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                    Use the AI search bar to generate a course on any topic.
                    </p>
                    <div className="mt-6">
                        <p className="text-sm">Click the search bar in the header to begin.</p>
                    </div>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}
