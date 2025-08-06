import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { userDataRef, auth } from "../Config/firebase";
//
async function signUpAuthHandler(data, setAuthData, navigate) {
  const email = data.email;
  const password = data.password;
  const username = data.name;
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
    setAuthData((data) => {
      return { ...data, isLoading: false, isError: null };
    });
    navigate("/");
  } catch (err) {
    setAuthData((data) => {
      return { ...data, isLoading: false, isError: err };
    });
    return err;
  }
}

async function logInAuthHandler(data, setAuthData, navigate) {
  const email = data.email;
  const password = data.password;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setAuthData((data) => {
      return { ...data, isLoading: false, isError: null };
    });
    navigate("/");
  } catch (err) {
    setAuthData((data) => {
      return { ...data, isLoading: false, isError: err };
    });
  }
}

async function logOutAuth() {
  try {
    await signOut(auth);
    console.log("logging out");
  } catch (err) {
    console.log(err, "error while logging out,,,");
  }
}
export { signUpAuthHandler, logInAuthHandler, logOutAuth };
