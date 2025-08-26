
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

  if (!isClient) {
    return null; 
  }

  const usagePercent = Math.min((usage.count / USER_QUOTA_LIMIT) * 100, 100);
  const isExhausted = usage.count >= USER_QUOTA_LIMIT;

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
                 <p>Our AI is resting. Please check back tomorrow.</p>
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
