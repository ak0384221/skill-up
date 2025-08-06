import { supabase } from "../Config/supabase";
import { auth } from "../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { userDataRef } from "../Config/firebase"; // your Firestore collection reference
import { uploadPost } from "./postsCRUD";

async function uploadPostFormHandler(
  evt,
  titleRef,
  pictureUrlRef,
  files,
  authData,
  setUploadData,
  navigate
) {
  const title = titleRef.current.value;
  let pictureUrl = pictureUrlRef.current.value;
  const username = authData?.currentUser?.displayName;
  const uid = authData?.currentUser?.uid;

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
      uploadPost(postObj, navigate);
      setUploadData((prev) => {
        return { ...prev, isUploading: false };
      });

      // waits for upload
      console.log("Uploaded URL:", pictureUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadData((prev) => {
        return { ...prev, isUploading: false, isError: err };
      });
      return; // Stop if upload fails
    }
  } else {
    if (title || pictureUrl) {
      try {
        const postObj = {
          username: username,
          title: title,
          pictureURL: pictureUrl,
          uid: uid,
        };
        uploadPost(postObj);
        setUploadData((prev) => {
          return { ...prev, isUploading: false };
        });
      } catch (err) {
        setUploadData((prev) => {
          return { ...prev, isUploading: false };
        });
      }
    }
  }
}
async function uploadFilesViaSupabase(files) {
  if (!files) {
    return { error: "no file selected" };
  }

  try {
    console.log(files);
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
  uploadPostFormHandler,
  handleUpdateProfile,
  uploadFilesViaSupabase,
  updateProfileInDb,
};
