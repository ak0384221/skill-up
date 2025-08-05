import AuthContextProvider from "./AuthContext";
import ChatContextProvider from "./ChatContext";

export default function ParentContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <ChatContextProvider>{children}</ChatContextProvider>
    </AuthContextProvider>
  );
}
