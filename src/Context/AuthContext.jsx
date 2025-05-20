import { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../Config/firebase";
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
        console.log(user);
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
      navigate("/posts");
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
      await updateProfile(userCredential.user, { displayName: username });
      console.log("signed in succesfully", userCredential.user);
    } catch (err) {
      console.log(err);
      passErrorDispatch(err);
    }
  }

  async function logInWithGoogle() {
    //login with google
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      navigate("/posts");
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
