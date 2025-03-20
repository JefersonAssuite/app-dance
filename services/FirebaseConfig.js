import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz9MQaDoU9sMCI_-v3ZX7-yz6djDQxJKA",
  authDomain: "app-dance-cf2aa.firebaseapp.com",
  projectId: "app-dance-cf2aa",
  storageBucket: "app-dance-cf2aa.firebasestorage.app",
  messagingSenderId: "875369744589",
  appId: "1:875369744589:web:f0ead9b575d2c59e92c184",
  measurementId: "G-ZW8KT76NVH"
};
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);