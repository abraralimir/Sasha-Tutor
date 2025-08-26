
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Code, Table, Cloud, BarChart, Loader2, Bell, MoreVertical, Trash2, Zap, BrainCircuit, Bot, CheckCircle } from 'lucide-react';
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
import { useAIBreak } from '@/hooks/use-ai-break';
import { cn } from '@/lib/utils';


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

function AIStatusIndicator() {
  const { user } = useAuth();
  const { isBreakTime, countdown } = useAIBreak();

  const userName = user?.displayName || 'learner';

  return (
    <div className="mt-8 flex items-center justify-center text-center p-4 rounded-lg bg-card border min-h-[120px]">
      <div className="relative flex items-center gap-4">
        <div className="relative flex h-3 w-3">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            isBreakTime ? "bg-red-400" : "bg-green-400"
          )}></span>
          <span className={cn(
            "relative inline-flex rounded-full h-3 w-3",
            isBreakTime ? "bg-red-500" : "bg-green-500"
          )}></span>
        </div>
        <div>
          {isBreakTime ? (
            <div>
              <p className="font-semibold">Dear {userName}, Sasha is taking a rest 😴.</p>
              <p className="text-muted-foreground text-sm">
                She will be back in <span className="font-bold text-primary">{countdown}</span>. A moment of rest leads to a marathon of knowledge.
              </p>
            </div>
          ) : (
            <p className="font-semibold text-lg">Sasha is working at full power!</p>
          )}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: "Instant Course Generation",
    description: "Just type a topic, and Sasha's AI instantly builds a comprehensive course outline. From Python to Public Speaking, your learning path is ready in seconds."
  },
  {
    icon: BookOpen,
    title: "Interactive Learning Paths",
    description: "Dive into lessons filled with AI-generated content, hands-on coding exercises, and quizzes that test your knowledge, ensuring you master every concept."
  },
  {
    icon: BrainCircuit,
    title: "Powerful AI Tools",
    description: "Go beyond courses with a suite of AI tools. Get code explanations, generate practice problems, or chat with Sasha to get answers, all in one place."
  },
  {
    icon: Bot,
    title: "Your Personal Workbook",
    description: "Upload your documents, and let Sasha's OCR and AI summarize them into neat notes. Combined with a spreadsheet and calculator, it's your ultimate study companion."
  }
];


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
          {user && <AIStatusIndicator />}
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

        {/* Features Section */}
        <section className="max-w-5xl mx-auto py-16 md:py-24">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold">How Sasha Works Its Magic</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Your personal AI tutor, designed to create a learning experience that's as unique as you are.
                </p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className="text-center p-6 bg-card rounded-lg border">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
        
        {/* Pricing Section */}
        <section className="max-w-5xl mx-auto py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Choose Your Path</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Start for free and scale up as you grow. Simple, transparent pricing for every learner.
            </p>
          </div>
          <div className="mt-12 grid lg:grid-cols-3 gap-8 items-start">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>For casual learners getting started.</CardDescription>
                <p className="text-4xl font-bold pt-4">$0 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> 5 Course Generations / 10 days</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Limited access to AI Tools</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Limited access to Workbook</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-primary shadow-lg">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For dedicated learners who want to go deeper.</CardDescription>
                <p className="text-4xl font-bold pt-4">$10 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
              </CardHeader>
              <CardContent className="space-y-4">
                 <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Unlimited Course Generations</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Full access to AI Tools</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Full access to Workbook</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Pro</Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For professionals seeking a premium experience.</CardDescription>
                <p className="text-4xl font-bold pt-4">$30 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
              </CardHeader>
              <CardContent className="space-y-4">
                 <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Everything in Pro, plus:</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Downloadable Content (PDFs)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Access to Special Sasha Models</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500 h-4 w-4" /> Priority Support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Choose Premium</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="max-w-4xl mx-auto text-center py-16">
            <h3 className="text-2xl font-bold">For Teams & Enterprises</h3>
            <p className="mt-2 text-muted-foreground">
                Empower your organization with a custom-branded learning platform. We offer white-labelling, custom domains, and dedicated support for enterprise clients.
            </p>
            <div className="mt-6">
                <a href="mailto:alimirabrar@gmail.com">
                    <Button size="lg">Contact Us</Button>
                </a>
            </div>
        </section>

      </main>
    </div>
  );
}
