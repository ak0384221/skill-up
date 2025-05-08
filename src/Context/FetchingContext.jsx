import { AuthContext } from "./AuthContext";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postDataRef } from "../firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
//important import statement------

export const FetchingContext = createContext([]);
export default function FetchingContextProvider({ children }) {
  //-------
  const [postList, setPostList] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const { authorized } = useContext(AuthContext);
  const navigate = useNavigate();
  //-------

  //Fetching posts initiallt from fireStore
  useEffect(() => {
    let unsubscribe = () => {};
    if (authorized) {
      const postsQuery = query(postDataRef, orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const postslist = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        console.log("snapshpt working..");
        setPostList(postslist);
      });
    } else {
      console.log("Not authorized....");
    }
    return () => unsubscribe();
  }, [authorized]);

  //Listener Function for database-----OnSnapshot

  //Functions of Uploading Post combined with prev posts
  function uploadPost(postObj) {
    setPostLoading(true);

    const postWithTimestamp = {
      ...postObj,
      createdAt: serverTimestamp(),
    };
    return addDoc(postDataRef, postWithTimestamp)
      .then(() => {
        console.log("post uploaded");

        console.log(postWithTimestamp);

        setPostLoading(false);
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
        setPostLoading(false);
      });
  }

  //Functions of Removing post
  function removePost(postId) {
    console.log(postId);
    const postDocRef = doc(postDataRef, postId);
    return deleteDoc(postDocRef)
      .then(() => {
        console.log("post removed");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Functions of Updating post
  function updatepost(postId, updatedData) {
    const singlePostRef = doc(postDataRef, postId);
    return updateDoc(singlePostRef, updatedData)
      .then(() => {
        console.log("post sucessfully updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FetchingContext.Provider
      value={{ updatepost, postLoading, uploadPost, removePost, postList }}
    >
      {children}
    </FetchingContext.Provider>
  );
}
