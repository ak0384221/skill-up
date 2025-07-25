import { supabase } from "../Config/supabase";
import { auth } from "../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { userDataRef } from "../Config/firebase"; // your Firestore collection reference

// src/utils/updateProfileInDb.js

function signUpFormHandler(
  evt,
  userNameRef,
  emailRef,
  passRef,
  confirmPassRef,
  signUpAuth
) {
  evt.preventDefault();
  const email = emailRef.current.value;
  const userName = userNameRef.current.value;
  const password = passRef.current.value;
  const confirmPassword = confirmPassRef.current.value;
  if (password === confirmPassword) {
    console.log(true);
    signUpAuth(userName, email, password);
  } else {
    console.log(false);
    alert("pass didnt match");
  }
}

function logInFormHandler(evt, emailRef, passRef, logInAuth) {
  evt.preventDefault();
  const email = emailRef.current.value;
  const password = passRef.current.value;
  logInAuth(email, password);
}

async function uploadPostFormHandler(
  evt,
  titleRef,
  pictureUrlRef,
  uploadPost,
  username,
  files,
  uid
) {
  evt.preventDefault();

  const title = titleRef.current.value;
  let pictureUrl = pictureUrlRef.current.value;

  if (files) {
    console.log(files);
    try {
      const res = await uploadFilesViaSupabase(files);
      pictureUrl = res.url;
      console.log(res);
      const postObj = {
        username: username,
        title: title,
        pictureURL: pictureUrl,
        uid: uid,
      };
      uploadPost(postObj);

      // waits for upload
      console.log("Uploaded URL:", pictureUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      return; // Stop if upload fails
    }
  } else {
    if (title || pictureUrl) {
      const postObj = {
        username: username,
        title: title,
        pictureURL: pictureUrl,
        uid: uid,
      };
      uploadPost(postObj);
    }
  }
}

async function uploadFilesViaSupabase(files) {
  if (!files) {
    return { error: "no file selected" };
  }

  try {
    const filename = `public/${Date.now()}-${files.name}`;
    const { error } = await supabase.storage
      .from("vibehive")
      .upload(filename, files);
    if (error) {
      return { err: error.message };
    }

    const { data } = await supabase.storage
      .from("vibehive")
      .getPublicUrl(filename);
    return { url: data.publicUrl };
  } catch (err) {
    return { error: err };
  }
}
async function updateProfileInDb(uid, updatedFields) {
  try {
    const userDocRef = doc(userDataRef, uid);
    await updateDoc(userDocRef, updatedFields);
    console.log("User profile updated in Firestore.");
  } catch (err) {
    console.error("Failed to update profile:", err.message);
    throw err;
  }
}
async function handleUpdateProfile(
  evt,
  profileData, // object with nickName, location, etc.
  navigate
) {
  evt.preventDefault();

  try {
    const uid = auth.currentUser.uid;
    await updateProfileInDb(uid, profileData);
    navigate("/");
  } catch (error) {
    console.error("Error updating Firestore:", error.message);
  }
}

export {
  signUpFormHandler,
  logInFormHandler,
  uploadPostFormHandler,
  handleUpdateProfile,
  uploadFilesViaSupabase,
  updateProfileInDb,
};
