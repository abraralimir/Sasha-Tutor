
'use client';

import { useState, useEffect } from 'react';

// Configuration for the break time in IST
const BREAK_START_HOUR_IST = 16; // 4 PM
const BREAK_END_HOUR_IST = 19;   // 7 PM
const IST_OFFSET_MINUTES = 330; // UTC+5:30

const getISTDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (IST_OFFSET_MINUTES * 60000));
};

export function useAIBreak() {
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const checkBreakTime = () => {
      const nowIST = getISTDate();
      const currentHourIST = nowIST.getHours();

      const breakStatus = currentHourIST >= BREAK_START_HOUR_IST && currentHourIST < BREAK_END_HOUR_IST;
      setIsBreakTime(breakStatus);

      if (breakStatus) {
        const breakEnd = new Date(nowIST);
        breakEnd.setHours(BREAK_END_HOUR_IST, 0, 0, 0);
        
        const diff = breakEnd.getTime() - nowIST.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`
        );
      }
    };

    checkBreakTime(); // Initial check
    const interval = setInterval(checkBreakTime, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return { isBreakTime, countdown };
}
