import {
  addDoc,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { supabase } from "../Config/supabase";
import { postDataRef, userDataRef } from "../Config/firebase";
import { uploadFilesViaSupabase } from "./uploadRelated";

async function uploadPost(postObj) {
  console.log(postObj);

  const postWithTimestamp = {
    ...postObj,
    createdAt: serverTimestamp(),
  };
  try {
    await addDoc(postDataRef, postWithTimestamp);
    console.log("post uploaded");
  } catch (err) {
    console.log(err);
  }
}
async function removePost(postId, picUrl) {
  let picPath;
  if (picUrl) {
    picPath = picUrl.split("/vibehive/")[1];
  }
  const postDocRef = doc(postDataRef, postId);
  try {
    await deleteDoc(postDocRef);
    const { error } = await supabase.storage.from("vibehive").remove([picPath]);
    if (error) {
      console.log("Image deletion failed:", error.message);
    } else {
      console.log("Image deleted from Supabase");
    }

    console.log("post removed");
  } catch (err) {
    console.log(err);
  }
}
async function updatepost(postId, updatedData, dispatch) {
  const singlePostRef = doc(postDataRef, postId);
  try {
    await updateDoc(singlePostRef, updatedData);
    dispatch({
      type: "UPDATE_ITEM",
      payload: { postId: postId, updatedData: updatedData, crudError: null },
    });
    console.log("post sucessfully updated");
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SET_CRUD_ERROR",
      payload: {
        crudError: err.message,
      },
    });
  }
}
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
async function updateLike(post, authData) {
  const postRef = doc(postDataRef, post.id);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) return;

  const postData = postSnap.data();
  const reactions = postData.reactions || [];

  const alreadyLikedIndex = reactions.findIndex(
    (reaction) => reaction.uid === authData.currentUser.uid
  );

  if (alreadyLikedIndex > -1) {
    // Remove like
    const updatedReactions = [...reactions];
    updatedReactions.splice(alreadyLikedIndex, 1);

    await updateDoc(postRef, {
      reactions: updatedReactions,
    });
  } else {
    // Add like
    const newReaction = {
      uid: authData.currentUser.uid,
      time: Timestamp.now(),
    };

    await updateDoc(postRef, {
      reactions: [...reactions, newReaction],
    });
  }
}

async function addComment(comment, post, authData) {
  const commentObj = {
    uid: authData.currentUser.uid,
    comment: comment.trim(),
    timestamp: Date.now(), // or new Date()
  };

  const postRef = doc(postDataRef, post.id); // assumes posts is your collection

  try {
    await updateDoc(postRef, {
      comments: arrayUnion(commentObj), // Firestore will create "comments" if it doesn't exist
    });
    console.log("Comment added");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

export {
  uploadPost,
  removePost,
  updatepost,
  updateUserImageArray,
  updateLike,
  addComment,
};
