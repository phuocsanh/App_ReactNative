import React from "react";
import Navigation from "./components/navigations";
import { UserContextProvider } from "./components/users/UserContext";
import { initializeApp } from "firebase9/app";
import { initializeFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBNwWFKrZ_aHS-O2Q8OtjoEaCxbOIz3wr8",
  authDomain: "myprojectreactnative-faff7.firebaseapp.com",
  projectId: "myprojectreactnative-faff7",
  storageBucket: "myprojectreactnative-faff7.appspot.com",
  messagingSenderId: "562033096838",
  appId: "1:562033096838:web:f0236981882d1b610f7907",
};
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  timestampsInSnapshot: true,
  merge: true,
});
export default function App() {
  return (
    <UserContextProvider>
      <Navigation db={db} />
    </UserContextProvider>
  );
}
