import { createContext, useContext, useEffect } from "react";
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
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

  function handleTitleChange(evt) {
    setEditTitle(evt.target.value);
  }

  function handleSave() {
    // Replace this with your actual Firestore update function
    console.log("Saving updated title:", editTitle);
    updatepost(post.id, { title: editTitle })
      .then(() => {
        setIsEditing(false);
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
