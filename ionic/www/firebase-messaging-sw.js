
// firebase desktop messaging
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '620756868871'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.title
  const notificationOptions = {
    body: payload.message,
    icon: 'assets/icon/icon.png',
    sound: 'default'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});