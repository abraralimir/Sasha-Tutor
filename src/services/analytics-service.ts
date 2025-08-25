
'use server';

import { getFirestore, collection, getCountFromServer } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps } from 'firebase-admin/app';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();
const auth = getAuth();

/**
 * Gets the total number of registered users from Firebase Authentication.
 * This function must run on the server.
 * @returns {Promise<number>} The total number of users.
 */
export async function getTotalUsers(): Promise<number> {
  try {
    // listUsers() returns a paginated result. We need to iterate through pages
    // for very large user bases, but for most apps, the first page is enough
    // to get a good estimate or total if under 1000. For a more accurate count
    // on large user bases, this would need to be a more complex function.
    // For now, we'll get the total count by iterating through all users.
    let userCount = 0;
    let nextPageToken;
    do {
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      userCount += listUsersResult.users.length;
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    
    return userCount;
  } catch (error) {
    console.error('Error fetching total users:', error);
    // In a real app, you might want to handle this more gracefully.
    return 0;
  }
}

/**
 * Gets the total number of notification subscribers from Firestore.
 * This function must run on the server.
 * @returns {Promise<number>} The total number of subscribers.
 */
export async function getNotificationSubscriberCount(): Promise<number> {
  try {
    const tokensCollection = collection(db, 'fcmTokens');
    const snapshot = await getCountFromServer(tokensCollection);
    return snapshot.data().count;
  } catch (error) {
    console.error('Error fetching notification subscriber count:', error);
    return 0;
  }
}
