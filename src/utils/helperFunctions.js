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

function uploadPostFormHandler(
  evt,
  titleRef,
  pictureUrlRef,
  uploadPost,
  username
) {
  evt.preventDefault();
  const title = titleRef.current.value;
  const pictureUrl = pictureUrlRef.current.value;

  const postObj = {
    username: username,
    title: title,
    pictureURL: pictureUrl,
  };
  uploadPost(postObj);
}
export { signUpFormHandler, logInFormHandler, uploadPostFormHandler };
