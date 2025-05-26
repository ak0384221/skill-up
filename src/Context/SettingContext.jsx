import { createContext, useReducer, useState } from "react";
export const SettingContext = createContext();
export default function SettingContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("Inter");
  const [lang, setLang] = useState("Eng");
  const [fontWeight, setFontWeight] = useState("normal");

  return (
    <SettingContext.Provider
      value={{
        theme,
        setTheme,
        font,
        setFont,
        lang,
        setLang,
        fontWeight,
        setFontWeight,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}
