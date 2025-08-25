// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyCDQdX6d-p_jJt90WInEdRHdAzuAtcUjWU",
    authDomain: "sasha-e-learning.firebaseapp.com",
    projectId: "sasha-e-learning",
    storageBucket: "sasha-e-learning.firebasestorage.app",
    messagingSenderId: "124651455087",
    appId: "1:124651455087:web:582c0b9bb3ea15f31ec39a"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
