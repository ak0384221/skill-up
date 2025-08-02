import { createContext, useEffect, useState } from "react";
import { userDataRef } from "../Config/firebase";
import { onSnapshot } from "firebase/firestore";

export const ChatContext = createContext([]);

export default function ChatContextProvider({ children }) {
  const [vibehiveUser, setVibehiveUser] = useState([]);
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
    <>
      <ChatContext.Provider value={{ vibehiveUser }}>
        {children}
      </ChatContext.Provider>
    </>
  );
}
