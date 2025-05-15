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
  where,
  limit,
  startAfter,
} from "firebase/firestore";
//important import statement------

export const FetchingContext = createContext([]);
export default function FetchingContextProvider({ children }) {
  //-------
  const [postList, setPostList] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { authorized } = useContext(AuthContext);
  const navigate = useNavigate();
  const POSTS_LIMIT = 10;
  //-------

  //Fetching posts initiallt from fireStore
  useEffect(() => {
    let unsubscribe = () => {};
    if (authorized) {
      const postsQuery = query(
        postDataRef,
        orderBy("createdAt", "desc"),
        limit(POSTS_LIMIT)
      );
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        const postslist = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setPostList(postslist);
        setLastDoc(lastVisible);
        setHasMore(snapshot.docs.length === POSTS_LIMIT);
      });
    } else {
      console.log("Not authorized....");
    }
    return () => unsubscribe();
  }, [authorized]);

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
        setPostList((prev) => prev.filter((post) => post.id !== postId));
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
        setPostList((prev) =>
          prev.map((post) =>
            post.id === postId ? { ...post, ...updatedData } : post
          )
        );
        console.log("post sucessfully updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchMorePosts() {
    if (lastDoc) {
      const nextQuery = query(
        postDataRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(POSTS_LIMIT)
      );
      const snapshot = await getDocs(nextQuery);
      if (snapshot.empty) {
        setHasMore(false);
        return;
      }
      const newPosts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPostList((prev) => {
        return [...prev, ...newPosts];
      });
      setHasMore(newPosts.length == POSTS_LIMIT);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    }
  }

  return (
    <FetchingContext.Provider
      value={{
        updatepost,
        postLoading,
        uploadPost,
        removePost,
        postList,
        fetchMorePosts,
        hasMore,
      }}
    >
      {children}
    </FetchingContext.Provider>
  );
}
