import { supabase } from "../Config/supabase";
import { auth } from "../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { userDataRef } from "../Config/firebase"; // your Firestore collection reference
import { uploadPost } from "./postsCRUD";
import imageCompression from "browser-image-compression";

async function compressImg(file) {
  const options = {
    maxSizeMB: 1, // maximum size in MB
    maxWidthOrHeight: 1080, // resize image if it's larger
    useWebWorker: true,
  };

  return imageCompression(file, options);
}

async function uploadPostFormHandler(
  titleRef,
  files,
  authData,
  setUploadData,
  navigate,
  isHd
) {
  if (files) {
    console.log(isHd);
    try {
      let picture = await compressImg(files);

      if (isHd) {
        picture = files;
      }

      const res = await uploadFilesViaSupabase(picture);
      const postObj = {
        username: authData?.currentUser?.displayName,
        title: titleRef.current.value,
        pictureURL: res.url,
        uid: authData?.currentUser?.uid,
      };
      await uploadPost(postObj);
      navigate("/");
      setUploadData((prev) => {
        return { ...prev, isUploading: false };
      });
      // waits for upload
      console.log("Uploaded URL:");
    } catch (error) {
      setUploadData((prev) => {
        return { ...prev, isUploading: false, isError: error };
      });
    }
  } else if (titleRef.current.value) {
    try {
      const postObj = {
        username: authData?.currentUser?.displayName,
        title: titleRef.current.value,
        uid: authData?.currentUser?.uid,
      };
      await uploadPost(postObj);
      navigate("/");
      setUploadData((prev) => {
        return { ...prev, isUploading: false };
      });
    } catch (error) {
      setUploadData((prev) => {
        return { ...prev, isUploading: false, isError: error };
      });
    }
  } else {
    setUploadData((prev) => {
      console.log();

      return { ...prev, isUploading: false, isError: { message: "Empty" } };
    });
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

    const { data } = supabase.storage.from("vibehive").getPublicUrl(filename);
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

// async function imageCompression(file){

//      const options = {
//         maxSizeMB: 1, // maximum size in MB
//         maxWidthOrHeight: 1080, // resize image if it's larger
//         useWebWorker: true,
//       };

//         try {
//               // Compress the image
//               const compressedFile = await imageCompression(file, options);

//               // Set file and preview
//               setFiles(compressedFile);
//               const objUrl = URL.createObjectURL(compressedFile);
//               setPreview(objUrl);
//             } catch (error) {
//               console.error("Image compression failed:", error);
//             }

// }

export {
  uploadPostFormHandler,
  handleUpdateProfile,
  uploadFilesViaSupabase,
  updateProfileInDb,
  compressImg,
};
