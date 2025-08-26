
'use client';

import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
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
  const [usage, setUsage] = useState({ count: 0 });
  const [countdown, setCountdown] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const docRef = doc(db, 'dailyRateLimits', today);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setUsage({ count: doc.data().count });
      } else {
        setUsage({ count: 0 });
      }
    });

    return () => unsubscribe();
  }, []);
  
  const isExhausted = usage.count >= USER_QUOTA_LIMIT;

  useEffect(() => {
    if (!isClient || !isExhausted) return;

    const calculateCountdown = () => {
      const now = new Date();
      // Set reset time to 12 hours from now, or midnight UTC, whichever is more relevant.
      // For this immediate request, we will use a 12-hour countdown.
      // A more robust solution for future would be midnight UTC.
      const resetTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);

      const interval = setInterval(() => {
        const currentTime = new Date();
        const totalSeconds = (resetTime.getTime() - currentTime.getTime()) / 1000;

        if (totalSeconds <= 0) {
          setCountdown('Refreshing now...');
          clearInterval(interval);
          // Optionally trigger a page reload or state refresh
          // window.location.reload(); 
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
    };

    return calculateCountdown();

  }, [isClient, isExhausted]);


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
                 <p>{countdown || "Our AI is resting. Please check back soon."}</p>
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
