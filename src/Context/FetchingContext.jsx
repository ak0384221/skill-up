import { createContext } from "react";
const FetchingContext = createContext([]);

export default function FetchingContextProvider({ children }) {
  return (
    <FetchingContext.Provider value={{ title: "123" }}>
      {children}
    </FetchingContext.Provider>
  );
}
