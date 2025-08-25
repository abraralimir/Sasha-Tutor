'use client';

import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';
import { useToast } from '@/hooks/use-toast';

export const useFcmToken = () => {
  const { toast } = useToast();

  const retrieveToken = async () => {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && messaging) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const currentToken = await getToken(messaging, {
            vapidKey: 'YOUR_VAPID_KEY_FROM_FIREBASE_CONSOLE', // Replace with your VAPID key
          });
          if (currentToken) {
            console.log('FCM token:', currentToken);
            toast({
              title: "Notifications Enabled!",
              description: "You will now receive updates.",
            });
            // You would typically send this token to your server to store it.
          } else {
            console.log('No registration token available. Request permission to generate one.');
            toast({
              title: "Could Not Enable Notifications",
              description: "Permission was granted, but token retrieval failed.",
              variant: "destructive",
            });
          }
        } else {
             toast({
              title: "Notification Permission Denied",
              description: "You can enable notifications from your browser settings.",
              variant: "destructive",
            });
        }
      }
    } catch (error) {
      console.error('An error occurred while retrieving token. ', error);
      toast({
          title: "Error",
          description: "An error occurred while enabling notifications.",
          variant: "destructive",
        });
    }
  };

  return { retrieveToken };
};
