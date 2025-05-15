import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext([]);
export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authorized, setAuthorized] = useState(null);
  const [AuthLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        console.log(authorized);
        setAuthorized(true);
        setCurrentUser(user);
        setAuthLoading(false);
        navigate("/posts");
      } else {
        setAuthorized(false);
        setCurrentUser(false);
      }
    });
    return () => {
      console.log("auth is quitting subscription");
      unsubscribe();
    };
  }, []);

  function logInAuth(email, password) {
    //then use the user
    setAuthLoading(true);
    console.log(email, password);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((err) => {
        console.log(err);
        setAuthLoading(false);
      });
  }

  async function signUpAuth(username, email, password) {
    console.log(username, email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      console.log("signed in succesfully", userCredential.user);
    } catch (err) {
      console.log(err);
      setAuthLoading(false);
    }
  }

  async function logInWithGoogle() {
    //login with google
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
    return;
  }

  async function logOutAuth() {
    try {
      await signOut(auth);
      console.log("logging out");
    } catch (err) {
      console.log(err, "error while logging out,,,");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authorized,
        logInWithGoogle,
        signUpAuth,
        logInAuth,
        logOutAuth,
        AuthLoading,
        setAuthLoading,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
