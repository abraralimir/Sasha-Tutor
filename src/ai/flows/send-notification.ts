
'use server';
/**
 * @fileOverview A flow to send web push notifications to all subscribed users.
 *
 * - sendNotification - A function that sends a notification.
 * - SendNotificationInput - The input type for the sendNotification function.
 */
import { initializeApp, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { getFirestore } from 'firebase-admin/firestore';
import { z } from 'zod';
import { ai } from '@/ai/genkit';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();
const messaging = getMessaging();

// Define the input type for the function, which is allowed.
export type SendNotificationInput = {
  title: string;
  body: string;
};

export async function sendNotification(input: SendNotificationInput): Promise<{ success: boolean; message: string }> {
    return sendNotificationFlow(input);
}

const sendNotificationFlow = ai.defineFlow(
  {
    name: 'sendNotificationFlow',
    // Define the Zod schema inline here so it doesn't need to be exported.
    inputSchema: z.object({
      title: z.string().describe('The title of the notification.'),
      body: z.string().describe('The main message content of the notification.'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async ({ title, body }) => {
    try {
      const tokensSnapshot = await db.collection('fcmTokens').get();
      const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

      if (tokens.length === 0) {
        console.log('No tokens to send notification to.');
        return { success: false, message: 'No subscribed users found.' };
      }

      const message = {
        notification: {
          title,
          body,
        },
        webpush: {
          fcmOptions: {
            link: '/', // Link to open when notification is clicked
          },
        },
        tokens: tokens,
      };

      const response = await messaging.sendEachForMulticast(message);
      console.log('Successfully sent message:', response);
      
      const successCount = response.successCount;
      const failureCount = response.failureCount;

      // Clean up invalid tokens
      const tokensToDelete: string[] = [];
      response.responses.forEach((result, index) => {
        if (!result.success) {
          const error = result.error;
          if (error && (error.code === 'messaging/registration-token-not-registered' || error.code === 'messaging/invalid-registration-token')) {
            const invalidToken = tokens[index];
            tokensToDelete.push(invalidToken);
            console.log(`Marking token for deletion: ${invalidToken}`);
          }
        }
      });

      if (tokensToDelete.length > 0) {
        const batch = db.batch();
        tokensToDelete.forEach(token => {
            const tokenRef = db.collection('fcmTokens').doc(token);
            batch.delete(tokenRef);
        });
        await batch.commit();
        console.log(`Deleted ${tokensToDelete.length} invalid tokens.`);
      }

      return {
        success: true,
        message: `Notification sent. Success: ${successCount}, Failed: ${failureCount}.`,
      };

    } catch (error) {
      console.error('Error sending notification:', error);
      return { success: false, message: 'Failed to send notification.' };
    }
  }
);
