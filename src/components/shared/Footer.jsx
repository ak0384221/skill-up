import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { SettingContext } from "../../Context/SettingContext";

export default function Footer() {
  const { currentUser } = useContext(AuthContext);
  const { theme } = useContext(SettingContext);
  return (
    <>
      {currentUser && (
        <footer
          className={`${
            (theme == "Dark" && "bg-[#181717] ") ||
            (theme === "Light" && "bg-[#eef7fd] ") ||
            (theme === "System" && "dark:bg-[#181717] ")
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
