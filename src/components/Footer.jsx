import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { SettingContext } from "../Context/SettingContext";

export default function Footer() {
  const { authorized } = useContext(AuthContext);
  const { theme } = useContext(SettingContext);
  return (
    <>
      {authorized && (
        <footer
          className={`${
            (theme == "Dark" && "bg-black ") ||
            (theme === "Light" && "bg-white ") ||
            (theme === "System" && "dark:bg-black ")
          } text-[#d265e7]  py-10  w-full `}
        >
          <div className="text-sm text-center text-[#7c7c7c] ">
            © 2021 SkillUp. All rights reserved.
          </div>
        </footer>
      )}
    </>
  );
}
