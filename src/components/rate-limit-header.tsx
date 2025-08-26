
'use client';

import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const DAILY_QUOTA = 50; 
const RESERVED_QUOTA = Math.floor(DAILY_QUOTA * 0.2); 
const USER_QUOTA_LIMIT = DAILY_QUOTA - RESERVED_QUOTA;

export function RateLimitHeader() {
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
  
  const isExhausted = usage.count >= USER_QUOTA_LIMIT;

  const resetTime = useMemo(() => {
    if (!isClient) return null;
    // Set reset time to 12 hours after the *first* request of the day that created the doc.
    const baseTime = usage.lastUpdated;
    const newResetTime = new Date(baseTime);
    newResetTime.setHours(newResetTime.getHours() + 12);
    return newResetTime;
  }, [isClient, usage.lastUpdated]);


  useEffect(() => {
    if (!isClient || !isExhausted || !resetTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const totalSeconds = (resetTime.getTime() - now.getTime()) / 1000;

      if (totalSeconds <= 0) {
        setCountdown('Limits should be refreshed now.');
        clearInterval(interval);
      } else {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        setCountdown(
          `Limits refresh in ${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);

  }, [isClient, isExhausted, resetTime]);


  if (!isClient) {
    return null; 
  }

  const usagePercent = Math.min((usage.count / USER_QUOTA_LIMIT) * 100, 100);

  const getGradientColor = () => {
    if (usagePercent < 50) return 'from-green-400 to-cyan-400';
    if (usagePercent < 85) return 'from-yellow-400 to-orange-400';
    return 'from-red-500 to-red-600';
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
           <div className="relative h-1 w-full bg-muted overflow-hidden">
                <div
                    className={cn(
                        'absolute top-0 left-0 h-full bg-gradient-to-r transition-all duration-500 ease-out',
                        getGradientColor(),
                        isExhausted && 'animate-pulse'
                    )}
                    style={{ width: `${usagePercent}%` }}
                />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            {isExhausted ? (
                 <p>{countdown || "Calculating refresh time..."}</p>
            ) : (
                <p>
                    {USER_QUOTA_LIMIT - usage.count} AI actions remaining today for users.
                </p>
            )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
