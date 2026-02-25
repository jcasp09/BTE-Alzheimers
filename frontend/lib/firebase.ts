import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBl2CPwZEuTMlDWUQil-T1ZAlrfwZSn9ig',
  authDomain: 'bte-alzheimers-fb.firebaseapp.com',
  projectId: 'bte-alzheimers-fb',
  storageBucket: 'bte-alzheimers-fb.firebasestorage.app',
  messagingSenderId: '604521649949',
  appId: '1:604521649949:ios:ef9c0f755efe7838f073f4',
};

// Initialize Firebase when the app starts (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { app };
