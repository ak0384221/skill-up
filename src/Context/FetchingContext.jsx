import { createContext, useContext, useEffect } from "react";
import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { postDataRef } from "../firebase";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
export const FetchingContext = createContext([]);

export default function FetchingContextProvider({ children }) {
  const [postList, setPostList] = useState([]);
  const { authorized } = useContext(AuthContext);
  const navigate = useNavigate();

  //fetching posts from database
  useEffect(() => {
    if (authorized) {
      getPost();
    } else {
      console.log("not authed");
    }
  }, [authorized]);

  function getPost() {
    return getDocs(postDataRef)
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(posts);
        setPostList(posts);

        return posts;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //addpost and combine prev posts
  function uploadPost(postObj) {
    return addDoc(postDataRef, postObj)
      .then((docRef) => {
        console.log("post uploaded");
        const newPost = { id: docRef.id, ...postObj };
        setPostList((prev) => {
          return [newPost, ...prev];
        });
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //remove post from database
  function removePost(postId) {
    console.log(postId);
    const postDocRef = doc(postDataRef, postId);
    return deleteDoc(postDocRef)
      .then(() => {
        console.log("post removed");
        setPostList((prev) => {
          return prev.filter((post) => post.id !== postId);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FetchingContext.Provider value={{ uploadPost, removePost, postList }}>
      {children}
    </FetchingContext.Provider>
  );
}
