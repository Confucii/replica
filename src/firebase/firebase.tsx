import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  NextOrObserver,
  User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "@firebase/firestore";
import { ArtistData, SongFullData } from "../interfaces";

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

export function initFirebaseAuth(callback: NextOrObserver<User>) {
  onAuthStateChanged(getAuth(), callback);
}

export async function getData() {
  const dataSnapshot = await getDocs(collection(firestore, "artists"));
  const data = dataSnapshot.docs.map((doc) => doc.data());
  return data as ArtistData[];
}

export async function getArtistData(name: string) {
  const dataSnapshot = await getDoc(doc(firestore, "artists", name));
  return dataSnapshot.data() as ArtistData;
}

export async function setUserData(uid: string) {
  const docRef = await getDoc(doc(firestore, "user-likes", uid));

  if (!docRef.exists()) {
    await setDoc(doc(firestore, "user-likes", uid), {
      likes: [],
    });
  }
}

export async function getUserLikedTracks(uid: string) {
  const docRef = await getDoc(doc(firestore, "user-likes", uid));

  const data = docRef.data();

  if (data) {
    return data.likes;
  }
}

export async function getUserLikedStatus(uid: string, name: string) {
  const docRef = await getDoc(doc(firestore, "user-likes", uid));

  const data = docRef.data();

  if (data) {
    const trackNames = data.likes.map((track: SongFullData) => track.name);

    return trackNames.includes(name);
  }
}

export async function addToUserLikes(uid: string, song: SongFullData) {
  const userLikesRef = doc(firestore, "user-likes", uid);

  await updateDoc(userLikesRef, {
    likes: arrayUnion({ ...song }),
  });
}

export async function removeFromUserLikes(uid: string, song: SongFullData) {
  const userLikesRef = doc(firestore, "user-likes", uid);
  await updateDoc(userLikesRef, {
    likes: arrayRemove({ ...song }),
  });
}
