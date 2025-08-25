
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(userCredential.user, { displayName: values.fullName });
      
      try {
        await sendEmailVerification(userCredential.user);
        toast({
            title: "Account Created",
            description: "A verification email has been sent. Please check your inbox.",
        });
      } catch (verificationError) {
          console.error("Failed to send verification email.", verificationError);
          toast({
            title: "Account Created",
            description: "You are logged in, but we failed to send a verification email. Please try again later.",
            variant: "destructive"
        });
      }

      router.push('/');
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already associated with an account. Please login instead.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialSignUp = async (provider: GoogleAuthProvider | OAuthProvider) => {
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Account Created",
        description: "You have been successfully signed up.",
      });
      router.push('/');
    } catch (error: any) {
       console.error("Social sign-up error:", error);
       if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email using a different sign-in method. Try logging in with the original method.');
      } else if (error.code !== 'auth/popup-closed-by-user') {
          setError('Failed to sign up. Please try again.');
       }
    }
  };

  async function handleGoogleSignUp() {
    setIsGoogleLoading(true);
    await handleSocialSignUp(new GoogleAuthProvider());
    setIsGoogleLoading(false);
  }
  
  async function handleAppleSignUp() {
    setIsAppleLoading(true);
    await handleSocialSignUp(new OAuthProvider('apple.com'));
    setIsAppleLoading(false);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Signup Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading || isAppleLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create an account
            </Button>
          </form>
        </Form>
        
        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 -translate-x-1/2 top-[-10px] bg-card px-2 text-sm text-muted-foreground">OR</span>
        </div>

        <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignUp} disabled={isLoading || isGoogleLoading || isAppleLoading}>
                 {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 74.9C309.4 104.3 280.8 96 248 96c-88.8 0-160.1 71.1-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Sign up with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={handleAppleSignUp} disabled={isLoading || isGoogleLoading || isAppleLoading}>
                 {isAppleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16.1,19.3C15,19.8,14.5,20.2,13.6,21c-0.9,0.8-1.5,1.1-2.5,1c-1,0-1.6-0.3-2.5-1c-0.9-0.8-1.5-1.1-2.5-1c-1.1,0-2.1,0.5-2.8,1.4c-1.1,1.3-2.1,3-0.8,5.1c0.9,1.4,2.2,2.2,3.7,2.2c1.3,0,2.1-0.4,3-1.2c0.9-0.8,1.6-1.2,2.8-1.2s1.9,0.4,2.8,1.2c0.9,0.8,1.7,1.2,3,1.2c1.5,0,2.8-0.8,3.7-2.2c1.3-2.1,0.3-3.8-0.8-5.1C18.2,19.8,17.2,19.3,16.1,19.3z M19.7,10c0,2.7-1.7,4.3-4.4,4.3s-4.4-1.5-4.4-4.2c0-2.6,1.8-4.3,4.4-4.3C18,5.7,19.7,7.4,19.7,10z"></path></svg>
                Sign up with Apple
            </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
