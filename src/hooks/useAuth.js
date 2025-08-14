// hooks/useAuth.js
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebase";

export default function useAuth() {
  const [authData, setAuthData] = useState({
    currentUser: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAuthData({
          currentUser: user || null,
          isLoading: false,
          isError: false,
        });
      },
      (error) => {
        setAuthData({
          currentUser: null,
          isLoading: false,
          isError: true,
        });
        console.error("Auth state error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return authData;
}
