// Adjust your firebase version to be able to works
importScripts(
    "https://www.gstatic.com/firebasejs/11.2.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging-compat.js"
  );
  
  // Fill your credentials here
  firebase.initializeApp({
    apiKey: 'AIzaSyBBwRvE-nm9nPuBzzZJNaE62kE6dWEJlgo',
    authDomain: 'pushme-innovations-day.firebaseapp.com',
    projectId: 'pushme-innovations-day',
    storageBucket: 'pushme-innovations-day.firebasestorage.app',
    messagingSenderId: '238179121502',
    appId: '1:238179121502:web:408e659500dfd2ce4df7cf',
    measurementId: 'G-4BQ7LXWJD9'
  });
  
  const messaging = firebase.messaging();