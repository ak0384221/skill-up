import FetchingContextProvider from "./FetchingContext";
import AuthContextProvider from "./AuthContext";
import ChatContextProvider from "./ChatContext";

export default function ParentContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <FetchingContextProvider>
        <ChatContextProvider>{children}</ChatContextProvider>
      </FetchingContextProvider>
    </AuthContextProvider>
  );
}
