import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBIxxgKKeQKz9CANkye4GDdSlRpQwAoZCc",
  authDomain: "blackcoder-95f2c.firebaseapp.com",
  projectId: "blackcoder-95f2c",
  storageBucket: "blackcoder-95f2c.appspot.com",
  messagingSenderId: "335075623428",
  appId: "1:335075623428:web:882e0cb2f7901633daeb51"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
const analytics = getAnalytics(App);

export const auth =  getAuth(App)
export default App
export const db = getFirestore(App)
export const storage = getStorage(App)