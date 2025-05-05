import { createContext } from "react";
export const FetchingContext = createContext([]);

export default function FetchingContextProvider({ children }) {
  return (
    <FetchingContext.Provider value={{ title: "123" }}>
      {children}
    </FetchingContext.Provider>
  );
}
