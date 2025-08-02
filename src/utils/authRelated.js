import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { userDataRef, auth } from "../Config/firebase";

function signUpFormHandler(
  evt,
  userNameRef,
  emailRef,
  passRef,
  confirmPassRef,
  navigate
) {
  evt.preventDefault();
  const email = emailRef.current.value;
  const userName = userNameRef.current.value;
  const password = passRef.current.value;
  const confirmPassword = confirmPassRef.current.value;
  if (password === confirmPassword) {
    console.log(true);
    signUpAuth(userName, email, password, navigate);
  } else {
    console.log(false);
    alert("pass didnt match");
  }
}
async function signUpAuth(username, email, password, navigate) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update Firebase Auth profile displayName
    await updateProfile(userCredential.user, { displayName: username });

    // Get doc ref (no await here)
    const userDocRef = doc(userDataRef, userCredential.user.uid);

    // Set user data in Firestore
    await setDoc(userDocRef, {
      email: userCredential.user.email,
      username: username,
      joinedOn: serverTimestamp(),
    });

    navigate("/");
  } catch (err) {
    console.error("Signup error:", err);
  }
}

function logInFormHandler(evt, emailRef, passRef, navigate) {
  evt.preventDefault();
  const email = emailRef.current.value;
  const password = passRef.current.value;
  logInAuth(email, password, navigate);
}
async function logInAuth(email, password, navigate) {
  //then use the user
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
  } catch (err) {
    console.log(err);
    setAuthData((data) => {
      return { ...data, isLoading: false, isError: err };
    });
  }
}
async function logInWithGoogle(navigate, setAuthData) {
  //login with google
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const userDocRef = doc(userDataRef, userCredential.user.uid);

    // Set user data in Firestore
    await setDoc(userDocRef, {
      email: userCredential.user.email,
      username: userCredential.user.displayName,
      joinedOn: serverTimestamp(),
    });

    console.log("Signed up successfully:", userCredential.user);

    navigate("/");
  } catch (err) {
    console.log(err);
    setAuthData((data) => {
      return { ...data, isLoading: false, isError: err };
    });
  }
  return;
}
async function logOutAuth() {
  try {
    await signOut(auth);
    console.log("logging out");
  } catch (err) {
    console.log(err, "error while logging out,,,");
  }
}
export {
  signUpFormHandler,
  logInFormHandler,
  logInAuth,
  logInWithGoogle,
  logOutAuth,
};
