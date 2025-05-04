import { createContext } from "react";
const AppContext = createContext([]);

export default function AppContextProvider({ children }) {
  return (
    <AppContext.Provider value={{ title: "123" }}>
      {children}
    </AppContext.Provider>
  );
}
