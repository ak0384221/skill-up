import { createContext } from "react";
import FetchingContextProvider from "./FetchingContext";
import AuthContextProvider from "./AuthContext";

export default function ParentContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <FetchingContextProvider>{children}</FetchingContextProvider>
    </AuthContextProvider>
  );
}
