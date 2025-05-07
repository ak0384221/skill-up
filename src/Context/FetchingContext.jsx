import { createContext, useContext, useEffect } from "react";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { postDataRef, db } from "../firebase";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import { collection, serverTimestamp } from "firebase/firestore";

export const FetchingContext = createContext([]);

export default function FetchingContextProvider({ children }) {
  const [postList, setPostList] = useState([]);
  const { authorized } = useContext(AuthContext);
  const navigate = useNavigate();
  //

  // fetching posts from database
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

        setPostList(posts);

        return posts;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //addpost and combine prev posts
  function uploadPost(postObj) {
    const postWithTimestamp = {
      ...postObj,
      createdAt: serverTimestamp(),
    };
    return addDoc(postDataRef, postObj)
      .then((docRef) => {
        console.log("post uploaded");
        const newPost = { id: docRef.id, ...postObj, createdAt: new Date() };
        setPostList((prev) => {
          return [newPost, ...prev];
        });
        console.log(newPost);
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
  function updatepost(postId, updatedData) {
    const singlePostRef = doc(postDataRef, postId);
    return updateDoc(singlePostRef, updatedData)
      .then(() => {
        console.log("post sucessfully updated");
        setPostList((prevDocs) =>
          prevDocs.map((pDoc) =>
            pDoc.id === postId ? { ...pDoc, title: updatedData.title } : pDoc
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FetchingContext.Provider
      value={{ updatepost, uploadPost, removePost, postList }}
    >
      {children}
    </FetchingContext.Provider>
  );
}
