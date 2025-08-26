
'use client';

import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Header } from '@/components/header';
import { Loader2, Bot } from 'lucide-react';

const DAILY_QUOTA = 50; 
const RESERVED_QUOTA = Math.floor(DAILY_QUOTA * 0.2); 
const USER_QUOTA_LIMIT = DAILY_QUOTA - RESERVED_QUOTA;


function LockScreen({ countdown }: { countdown: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem-0.25rem)] text-center p-8 bg-background">
            <Bot className="h-24 w-24 text-primary animate-bounce" />
            <h1 className="mt-8 text-4xl font-bold tracking-tight">Sasha will be right back!</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Our AI has been working hard and needs a short break to recharge.
            </p>
            <div className="mt-8">
                <p className="text-sm text-muted-foreground">Service will resume in:</p>
                <p className="text-5xl font-bold tracking-tighter text-primary">
                    {countdown || <Loader2 className="inline-block animate-spin" />}
                </p>
            </div>
        </div>
    );
}


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [usage, setUsage] = useState({ count: 0, lastUpdated: new Date() });
  const [countdown, setCountdown] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const docRef = doc(db, 'dailyRateLimits', today);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUsage({ 
          count: data.count,
          lastUpdated: data.createdAt?.toDate() || new Date()
        });
      } else {
        setUsage({ count: 0, lastUpdated: new Date() });
      }
    });

    return () => unsubscribe();
  }, []);

  const isExceeded = usage.count >= USER_QUOTA_LIMIT;

  const resetTime = useMemo(() => {
    if (!isClient) return null;
    const baseTime = usage.lastUpdated;
    const newResetTime = new Date(baseTime);
    newResetTime.setHours(newResetTime.getHours() + 12);
    return newResetTime;
  }, [isClient, usage.lastUpdated]);

  useEffect(() => {
    if (!isClient || !isExceeded || !resetTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const totalSeconds = (resetTime.getTime() - now.getTime()) / 1000;

      if (totalSeconds <= 0) {
        setCountdown('Refreshing now...');
        clearInterval(interval);
      } else {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        setCountdown(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);

  }, [isClient, isExceeded, resetTime]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {isExceeded ? <LockScreen countdown={countdown} /> : children}
      </main>
    </div>
  );
}
