import { createContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
export const FetchingContext = createContext([]);

export default function FetchingContextProvider({ children }) {
  function uploadPost(postObj) {
    const postDataRef = collection(db, "postsData");

    return addDoc(postDataRef, postObj)
      .then(() => {
        console.log("post uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FetchingContext.Provider value={{ uploadPost }}>
      {children}
    </FetchingContext.Provider>
  );
}
