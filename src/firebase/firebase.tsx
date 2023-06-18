import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXiqr4IiGXVBuU_nRoXPYNZ6fZEdz6X6Q",
  authDomain: "replica-b1c5c.firebaseapp.com",
  projectId: "replica-b1c5c",
  storageBucket: "replica-b1c5c.appspot.com",
  messagingSenderId: "216814495938",
  appId: "1:216814495938:web:a57230f6a2999df085b35b",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithRedirect(getAuth(), provider);
}

export function signOutUser() {
  signOut(getAuth());
}

export function initFirebaseAuth(callback: any) {
  onAuthStateChanged(getAuth(), callback);
}

export async function getData() {
  const dataSnapshot = await getDocs(collection(firestore, "artists"));
  const data = dataSnapshot.docs.map((doc) => doc.data());
  return data;
}
