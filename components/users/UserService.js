import {
  getAuth,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
} from "firebase9/auth";

import { initializeApp } from "firebase9/app";
const firebaseConfig = {
  apiKey: "AIzaSyBNwWFKrZ_aHS-O2Q8OtjoEaCxbOIz3wr8",
  authDomain: "myprojectreactnative-faff7.firebaseapp.com",
  projectId: "myprojectreactnative-faff7",
  storageBucket: "myprojectreactnative-faff7.appspot.com",
  messagingSenderId: "562033096838",
  appId: "1:562033096838:web:f0236981882d1b610f7907",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();
export const onSignIn = async (email, password) => {
  const credential = EmailAuthProvider.credential(email, password);
  await signInWithCredential(auth, credential);
};
export const onSignOut = async () => await signOut(auth);
export const onSignUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};
