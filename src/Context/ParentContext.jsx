import { createContext } from "react";
import FetchingContextProvider from "./FetchingContext";
import AuthContextProvider from "./AuthContext";
import SettingContextProvider from "./SettingContext";

export default function ParentContextProvider({ children }) {
  return (
    <SettingContextProvider>
      <AuthContextProvider>
        <FetchingContextProvider>{children}</FetchingContextProvider>
      </AuthContextProvider>
    </SettingContextProvider>
  );
}
