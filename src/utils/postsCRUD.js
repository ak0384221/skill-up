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
  const postWithTimestamp = {
    ...postObj,
    createdAt: serverTimestamp(),
  };
  try {
    await addDoc(postDataRef, postWithTimestamp);
    console.log("Post uploaded");
  } catch (err) {
    console.log(err);
  }
}

async function removePost(postId, picUrl) {
  const postDocRef = doc(postDataRef, postId);
  try {
    await deleteDoc(postDocRef);
    if (picUrl) {
      const picPath = picUrl.split("/vibehive/")[1];
      const { error } = await supabase.storage
        .from("vibehive")
        .remove([picPath]);
      if (error) console.log("Image deletion failed:", error.message);
      else console.log("Image deleted from Supabase");
    }
    console.log("Post removed");
  } catch (err) {
    console.log(err);
  }
}

async function updatepost(postId, updatedData) {
  const singlePostRef = doc(postDataRef, postId);
  try {
    await updateDoc(singlePostRef, updatedData);
    console.log("Post successfully updated");
  } catch (err) {
    console.log(err);
  }
}

async function updateUserImageArray(uid, file, type) {
  try {
    const pictureUrl = await uploadFilesViaSupabase(file);
    if (!pictureUrl) throw new Error("Failed to get image URL");

    const newImageObj = {
      pictureUrl: pictureUrl.url,
      uploadedAt: Timestamp.now(),
    };

    const userDocRef = doc(userDataRef, uid);
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) throw new Error("User not found");

    const existingArray = userSnap.data()[type] || [];
    const updatedArray = [...existingArray, newImageObj];

    await updateDoc(userDocRef, { [type]: updatedArray });
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

  const reactions = postSnap.data().reactions || [];
  const alreadyLikedIndex = reactions.findIndex(
    (r) => r.uid === authData.currentUser.uid
  );

  if (alreadyLikedIndex > -1) {
    const updatedReactions = [...reactions];
    updatedReactions.splice(alreadyLikedIndex, 1);
    await updateDoc(postRef, { reactions: updatedReactions });
  } else {
    const newReaction = {
      uid: authData.currentUser.uid,
      time: Timestamp.now(),
    };
    await updateDoc(postRef, { reactions: [...reactions, newReaction] });
  }
}

async function addComment(comment, post, authData) {
  const commentObj = {
    uid: authData.currentUser.uid,
    comment: comment.trim(),
    timestamp: Timestamp.now(),
  };

  const postRef = doc(postDataRef, post.id);

  try {
    await updateDoc(postRef, { comments: arrayUnion(commentObj) });
    console.log("Comment added");
  } catch (err) {
    console.error("Error adding comment:", err);
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
