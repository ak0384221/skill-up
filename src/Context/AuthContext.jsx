import { createContext, useEffect, useState } from "react";
import { auth } from "../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext([]);

export default function AuthContextProvider({ children }) {
  const [authData, setAuthData] = useState({
    currentUser: null,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthData((data) => {
          return { currentUser: user, isLoading: false, isError: false };
        });
      } else {
        setAuthData((data) => {
          return { currentUser: null, isLoading: false, isError: false };
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
