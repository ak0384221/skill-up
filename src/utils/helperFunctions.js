import { supabase } from "../Config/supabase";

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

  console.log({ email, userName, password, confirmPassword });
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
  files
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

export { signUpFormHandler, logInFormHandler, uploadPostFormHandler };
