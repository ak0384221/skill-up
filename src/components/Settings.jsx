import { useContext } from "react";
import { SettingContext } from "../Context/SettingContext";

export default function Settings() {
  const {
    theme,
    setTheme,
    font,
    setFont,
    lang,
    setLang,
    fontWeight,
    setFontWeight,
  } = useContext(SettingContext);
  console.log(theme, font, lang);
  return (
    <>
      <div className=" w-full md:w-3/4 lg:w-1/2 ">
        <div className="logo text-center text-4xl mt-5  font-Fugaz  bg-gradient-to-r from-[#719af3] to-blue-700  bg-clip-text text-transparent">
          Settings
        </div>
        <ul className="w-full px-3 mx-auto my-6 space-y-2 h-[70vh]">
          <li className=" w-full py-4 px-4 rounded-sm">
            <span className="left">Themes</span>
            <span className="float-right">
              {" "}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-30 border-1 border-[#af7dcc] px-3 rounded-sm  text-[#252525] py-1 outline-0 "
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </span>
          </li>
          <li className=" w-full py-4 px-4 rounded-sm">
            <span className="left">Font</span>
            <span className="float-right">
              {" "}
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-30 border-1 border-[#af7dcc] px-3 rounded-sm  text-[#252525] py-1 outline-0 "
              >
                <option className="">Inter</option>
                <option className="font-Roboto">Roboto</option>
                <option className="font-sans">Sans</option>
                <option className="font-serif">Serif</option>
                <option className="font-Fugaz">Fugaz</option>
                <option className="font-Bebas">Bebas</option>
              </select>
            </span>
          </li>
          {/* <li className=" w-full py-4 px-4 rounded-sm">
            <span className="left">Language</span>
            <span className="float-right">
              {" "}
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-30 border-1 border-[#af7dcc] px-3 rounded-sm  text-[#252525] py-1 outline-0 "
              >
                <option>Ban</option>
                <option>Eng</option>
              </select>
            </span>
          </li> */}
          <li className=" w-full py-4 px-4 rounded-sm ">
            <span className="left">Font Weight</span>
            <span className="float-right">
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-30 border-1 border-[#af7dcc] px-3 rounded-sm  text-[#252525] py-1 outline-0 "
              >
                <option className="">light</option>
                <option className="font-Roboto">normal</option>
                <option className="font-sans">semibold</option>
                <option className="font-serif">bold</option>
                <option className="font-Fugaz">extrabold</option>
              </select>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
