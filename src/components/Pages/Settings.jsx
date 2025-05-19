import { useContext } from "react";
//built-in
import { SettingContext } from "../../Context/SettingContext";

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
        <div className="logo text-center text-4xl mt-5  font-Fugaz text-gradient-purple w-max mx-auto">
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
                className="w-30 border-1 border-[#af7dcc] px-3 rounded-sm  py-1 outline-0  bg-[#181818] text-white "
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
                className="w-30 border-1 border-[#af7dcc] px-3 rounded-sm  py-1 outline-0  bg-[#181818] text-white"
              >
                <option className="font-Inter">Inter</option>
                <option className="font-Roboto">Roboto</option>
                <option className="font-sans">Sans</option>
                <option className="font-serif">Serif</option>
                <option className="font-Fugaz">Fugaz</option>
                <option className="font-Bebas">Bebas</option>
              </select>
            </span>
          </li>

          <li className=" w-full py-4 px-4 rounded-sm ">
            <span className="left">Font Weight</span>
            <span className="float-right">
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-30 border-1 border-[#af7dcc] px-3 rounded-sm  py-1 outline-0   bg-[#181818] text-white "
              >
                <option>light</option>
                <option>normal</option>
                <option>semibold</option>
                <option>bold</option>
                <option>extrabold</option>
              </select>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
