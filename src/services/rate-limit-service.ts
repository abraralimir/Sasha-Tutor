
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, increment, serverTimestamp, Timestamp } from 'firebase/firestore';

// The daily quota for the Gemini free tier (as of latest info)
const DAILY_QUOTA = 50; 
// Reserve 20% of the quota for admin/essential tasks
const RESERVED_QUOTA = Math.floor(DAILY_QUOTA * 0.2); 
// The limit available to general users
const USER_QUOTA_LIMIT = DAILY_QUOTA - RESERVED_QUOTA;

interface RateLimitDoc {
  count: number;
  createdAt: Timestamp;
}

/**
 * Checks if the user-facing rate limit has been exceeded for the day.
 * If not, it increments the counter. This function now throws an error
 * when the limit is exceeded, which should be caught by the calling flow.
 * @returns {Promise<{
 *   isExceeded: boolean;
 *   remaining?: number;
 * }>}
 */
export async function checkAndIncrementRateLimit(): Promise<{
  isExceeded: boolean;
  remaining?: number;
}> {
  const today = new Date().toISOString().split('T')[0]; // e.g., "2024-05-21"
  const docRef = doc(db, 'dailyRateLimits', today);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as RateLimitDoc;
      if (data.count >= USER_QUOTA_LIMIT) {
        // Throw an error that can be caught by the calling AI flow.
        throw new Error('The daily AI quota has been reached. Please try again tomorrow.');
      }
      // Increment the count
      await setDoc(docRef, { count: increment(1) }, { merge: true });
      return { isExceeded: false, remaining: USER_QUOTA_LIMIT - (data.count + 1) };
    } else {
      // Document doesn't exist, so create it for the new day
      await setDoc(docRef, {
        count: 1,
        createdAt: serverTimestamp(),
      });
      return { isExceeded: false, remaining: USER_QUOTA_LIMIT - 1 };
    }
  } catch (error) {
    console.error('Error in rate limiting service:', error);
    // Re-throw the error to be handled by the caller.
    throw error;
  }
}
