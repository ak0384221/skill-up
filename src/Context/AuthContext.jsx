import { createContext } from "react";
import auth from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext([]);
export default function AuthContextProvider({ children }) {
  function logIn() {
    //then use the user
  }

  function signup(username, email, password) {
    //create a User
  }

  function logInWithGoogle() {
    //login with google
  }

  function logOut() {}

  return (
    <AuthContext.Provider value={{ title: "123" }}>
      {children}
    </AuthContext.Provider>
  );
}
