import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
//built-in
import { AuthContext } from "./AuthContext";
import { postDataRef, userDataRef } from "../Config/firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { supabase } from "../Config/supabase";
import {
  postsInitialState,
  postsContentReducerMethod,
} from "../Reducers/PostCRUD";

import { uploadFilesViaSupabase } from "../utils/helperFunctions";
//important import statement------

export const FetchingContext = createContext([]);
export default function FetchingContextProvider({ children }) {
  const [postContents, dispatchPostsContent] = useReducer(
    postsContentReducerMethod,
    postsInitialState
  );
  const { postLists, crudError } = postContents;
  let { hasMore, lastDoc, postLoading } = postContents;
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const POSTS_LIMIT = 10;
  //-------

  //Fetching posts initially from fireStore
  useEffect(() => {
    console.log(currentUser);
    let unsubscribe = () => {};
    if (currentUser) {
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
        addInitialPosts(
          postslist,
          lastVisible,
          snapshot.docs.length === POSTS_LIMIT
        );
      });
    } else {
      console.log("Not authorized....");
    }
    return () => unsubscribe();
  }, [currentUser]);

  //Functions of Uploading Post combined with prev posts
  async function uploadPost(postObj) {
    console.log(postObj);
    dispatchPostsContent({
      type: "SET_LOADING",
      payload: { postLoading: true },
    });

    const postWithTimestamp = {
      ...postObj,
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(postDataRef, postWithTimestamp);
      console.log("post uploaded");

      dispatchPostsContent({
        type: "SET_LOADING",
        payload: { postLoading: false },
      });
      navigate("/");
      dispatchPostsContent({
        type: "SET_CRUD_ERROR",
        payload: {
          crudError: null,
        },
      });
    } catch (err) {
      console.log(err);
      dispatchPostsContent({
        type: "SET_CRUD_ERROR",
        payload: {
          crudError: err.message,
        },
      });
      dispatchPostsContent({
        type: "SET_LOADING",
        payload: { postLoading: false },
      });
    }
  }

  //Functions of Removing post
  async function removePost(postId, picUrl) {
    let picPath;
    if (picUrl) {
      picPath = picUrl.split("/vibehive/")[1];
    }
    console.log(postId);
    const postDocRef = doc(postDataRef, postId);
    try {
      await deleteDoc(postDocRef);
      const { error } = await supabase.storage
        .from("vibehive")
        .remove([picPath]);
      if (error) {
        console.log("Image deletion failed:", error.message);
      } else {
        console.log("Image deleted from Supabase");
      }
      dispatchPostsContent({
        type: "REMOVE_ITEM",
        payload: { postId: postId }, // Replace with actual ID
      });
      console.log("post removed");
      dispatchPostsContent({
        type: "SET_CRUD_ERROR",
        payload: {
          crudError: null,
        },
      });
    } catch (err) {
      console.log(err);
      dispatchPostsContent({
        type: "SET_CRUD_ERROR",
        payload: {
          crudError: err.message,
        },
      });
    }
  }

  //Functions of Updating post
  async function updatepost(postId, updatedData) {
    const singlePostRef = doc(postDataRef, postId);
    try {
      await updateDoc(singlePostRef, updatedData);
      dispatchPostsContent({
        type: "UPDATE_ITEM",
        payload: { postId: postId, updatedData: updatedData, crudError: null },
      });
      console.log("post sucessfully updated");
    } catch (err) {
      console.log(err);
      dispatchPostsContent({
        type: "SET_CRUD_ERROR",
        payload: {
          crudError: err.message,
        },
      });
    }
  }

  //dispatch functions for initial posts

  function addInitialPosts(postLists, lastDoc, hasMore) {
    const initialItems = {
      type: "ADD_INITIAL_POSTS",
      payload: {
        postLists,
        lastDoc,
        hasMore,
      },
    };
    dispatchPostsContent(initialItems);
  }

  //   import { doc, updateDoc, getDoc } from "firebase/firestore";
  // import { db } from "./firebase"; // adjust the path to your firestore config

  async function updateUserImageArray(uid, file, type) {
    // type = "profilePics" or "coverPics"
    try {
      // 1. Upload to Supabase and get public URL
      const pictureUrl = await uploadFilesViaSupabase(file);
      if (!pictureUrl) throw new Error("Failed to get image URL");

      // 2. Create new image object
      const newImageObj = {
        pictureUrl: pictureUrl.url,
        uploadedAt: Timestamp.now(),
      };

      // 3. Reference Firestore user document
      const userDatas = doc(userDataRef, uid); // ✅ FIXED: create doc ref from uid
      const userSnap = await getDoc(userDatas);

      if (!userSnap.exists()) {
        throw new Error("User not found");
      }

      const existingData = userSnap.data();
      const existingArray = existingData[type] || [];

      // 4. Append new image object
      const updatedArray = [...existingArray, newImageObj];

      // 5. Update Firestore
      await updateDoc(userDatas, {
        [type]: updatedArray,
      });

      return { success: true, updatedArray };
    } catch (err) {
      console.error("Error updating Firestore:", err.message);
      return { success: false, error: err.message };
    }
  }

  return (
    <FetchingContext.Provider
      value={{
        updatepost,
        uploadPost,
        removePost,
        postLists,
        hasMore,
        crudError,
        postLoading,
        lastDoc,
        POSTS_LIMIT,
        postDataRef,
        updateUserImageArray,
        dispatchPostsContent,
      }}
    >
      {children}
    </FetchingContext.Provider>
  );
}
