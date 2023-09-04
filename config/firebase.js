import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyYDdIYvQ3rw0LGBGrtGZaisnfn0iXnZc",
  authDomain: "messenger-q.firebaseapp.com",
  databaseURL:
    "https://messenger-q-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "messenger-q",
  storageBucket: "messenger-q.appspot.com",
  messagingSenderId: "333100533712",
  appId: "1:333100533712:web:6967eae31c3bf733e31bd5",
  measurementId: "G-ZN9DT4ZH16",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };
