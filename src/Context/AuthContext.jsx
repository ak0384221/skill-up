import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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

  function signUpAuth(username, email, password) {
    console.log(username, email, password);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        console.log(error);
        setAuthLoading(false);
      });
    //create a User
  }

  function logInWithGoogle() {
    //login with google
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logOutAuth() {
    return signOut(auth)
      .then(() => {
        console.log("logging out... ");
      })
      .catch((err) => {
        console.log(err);
      });
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
