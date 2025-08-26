
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Loader2, Trash2, Edit, Users, Bell, Sparkles } from 'lucide-react';
import { getCourses, deleteCourse, Course, addCourse } from '@/services/course-service';
import { getTotalUsers, getNotificationSubscriberCount } from '@/services/analytics-service';
import { generateCompleteCourse } from '@/lib/actions';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';

function StatCard({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function GenerateCourseDialog() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic || !user) return;
    setIsGenerating(true);
    toast({
      title: 'Course Generation Started',
      description: `Sasha is now creating a full course on "${topic}". This may take a few minutes.`,
      duration: 10000,
    });
    try {
      const newCourse = await generateCompleteCourse({ topic, userId: user.uid });
      const newCourseId = await addCourse(newCourse);
      toast({
        title: 'Course Created!',
        description: `Successfully generated and saved the new course. You can now edit it.`,
      });
      setIsOpen(false);
      setTopic('');
      router.push(`/admin/courses/${newCourseId}`);
    } catch (err) {
      console.error('Failed to generate complete course', err);
      toast({
        title: 'Error',
        description: 'Failed to generate the course. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
     <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className='text-primary'/> One-Click Course Generation</DialogTitle>
          <DialogDescription>
            Enter a topic, and Sasha will generate the entire course curriculum, content, and quizzes for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic" className="text-right">
              Topic
            </Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Introduction to SQL"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isGenerating}>Cancel</Button>
          <Button type="submit" onClick={handleGenerate} disabled={isGenerating || !topic}>
            {isGenerating && <Loader2 className="mr-2 animate-spin" />}
            {isGenerating ? 'Generating...' : 'Generate Course'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, subscribers: 0 });
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      setIsStatsLoading(true);
      try {
        const [userCount, subscriberCount] = await Promise.all([
          getTotalUsers(),
          getNotificationSubscriberCount()
        ]);
        setStats({ totalUsers: userCount, subscribers: subscriberCount });
      } catch (err) {
        console.error("Failed to load stats", err);
        toast({ title: "Error", description: "Could not load dashboard analytics.", variant: "destructive" });
      } finally {
        setIsStatsLoading(false);
      }
    };

    fetchStats();
  }, [toast]);


  useEffect(() => {
    const unsubscribe = getCourses((data, err) => {
      if (err) {
        setError(err);
        setIsLoading(false);
      } else {
        setCourses(data);
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleEditCourse = (courseId: string) => {
    router.push(`/admin/courses/${courseId}`);
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      toast({
        title: 'Success',
        description: 'Course has been deleted.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete the course.',
        variant: 'destructive',
      });
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Admin Dashboard"
        description="Manage your learning content and view platform analytics."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-8">
            {isStatsLoading ? (
              <>
                <Card><CardHeader><CardTitle><Loader2 className="animate-spin" /></CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">-</div></CardContent></Card>
                <Card><CardHeader><CardTitle><Loader2 className="animate-spin" /></CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">-</div></CardContent></Card>
              </>
            ) : (
              <>
                <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
                <StatCard title="Notification Subscribers" value={stats.subscribers} icon={Bell} />
              </>
            )}
           </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Courses</h2>
            <GenerateCourseDialog />
          </div>
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {!isLoading && !error && courses.length === 0 ? (
            <p>No courses found. Click "Create New Course" to get started.</p>
          ) : (
            <div className="grid gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>
                            {course.chapters.length} chapters, {course.chapters.reduce((acc, chap) => acc + chap.lessons.length, 0)} lessons
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEditCourse(course.id)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the course "{course.title}".
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteCourse(course.id)}>
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
