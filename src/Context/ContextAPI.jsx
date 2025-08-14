import { createContext, useEffect, useState } from "react";
import { auth, userDataRef } from "../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";

export const ContextAPI = createContext([]);

export default function ContextAPIprovider({ children }) {
  const [authData, setAuthData] = useState({
    currentUser: null,
    isLoading: false,
    isError: false,
  });
  const [vibehiveUser, setVibehiveUser] = useState([]);

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
  useEffect(() => {
    const unsubscribe = onSnapshot(userDataRef, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVibehiveUser(userList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ContextAPI.Provider
      value={{
        authData,
        setAuthData,
        vibehiveUser,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
}
