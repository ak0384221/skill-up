import { createContext, useEffect, useReducer, useState } from "react";
import { auth, userDataRef } from "../Config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authContent, authReducerMethod } from "../Reducers/AuthReducer";

export const AuthContext = createContext([]);
export default function AuthContextProvider({ children }) {
  const [authInitialValue, dispatchAuthMethod] = useReducer(
    authReducerMethod,
    authContent
  );
  const { currentUser, authLoading, authError } = authInitialValue;
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatchAuthMethod({ type: "LOG_IN", payload: { user: user } });
      } else {
        dispatchAuthMethod({ type: "NOT_AUTHED", payload: { user: user } });
      }
    });
    return () => {
      console.log("auth is quitting subscription");
      unsubscribe();
    };
  }, []);

  async function logInAuth(email, password) {
    //then use the user
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      passErrorDispatch(err);
    }
  }
  async function signUpAuth(username, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update Firebase Auth profile displayName
      await updateProfile(userCredential.user, { displayName: username });

      // Get doc ref (no await here)
      const userDocRef = doc(userDataRef, userCredential.user.uid);

      // Set user data in Firestore
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        username: username,
        joinedOn: serverTimestamp(),
      });

      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      passErrorDispatch(err);
    }
  }

  async function logInWithGoogle() {
    //login with google
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userDocRef = doc(userDataRef, userCredential.user.uid);

      // Set user data in Firestore
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        username: userCredential.user.displayName,
        joinedOn: serverTimestamp(),
      });

      console.log("Signed up successfully:", userCredential.user);

      navigate("/");
    } catch (err) {
      console.log(err);
      passErrorDispatch(err);
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

  function passLoadingDispatch(loading) {
    const newLoadingState = {
      type: "SET_LOADING",
      payload: {
        loadingState: loading,
      },
    };
    dispatchAuthMethod(newLoadingState);
  }
  function passErrorDispatch(err) {
    const newErr = {
      type: "SET_ERROR",
      payload: {
        errorState: err,
      },
    };
    dispatchAuthMethod(newErr);
  }

  return (
    <AuthContext.Provider
      value={{
        logInWithGoogle,
        signUpAuth,
        logInAuth,
        logOutAuth,
        currentUser,
        authLoading,
        passLoadingDispatch,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
