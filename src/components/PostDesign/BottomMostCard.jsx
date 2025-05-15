import { useContext } from "react";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { SettingContext } from "../../Context/SettingContext";

export default function BottomMostCard() {
  const { theme } = useContext(SettingContext);
  return (
    <div className="lower  h-[3.5rem]  p-2  flex justify-center items-center  w-4/5 mx-auto ">
      <span
        className={`cursor-pointer flex justify-center items-center w-1/2 h-full   rounded-md transition-colors ${
          (theme == "Dark" && "hover:bg-[#0a0a0a]") ||
          (theme == "Light" && "hover:bg-[#e7e7e7]") ||
          (theme == "System" && "dark:hover:bg-[#0a0a0a]")
        }`}
      >
        <CiHeart className=" text-3xl " />
      </span>
      <span
        className={` cursor-pointer flex justify-center items-center w-1/2 h-full   rounded-md transition-colors ${
          (theme == "Dark" && "hover:bg-[#0a0a0a]") ||
          (theme == "Light" && "hover:bg-[#e7e7e7]") ||
          (theme == "System" && "dark:hover:bg-[#0a0a0a]")
        }`}
      >
        <CiShare2 className=" text-3xl " />
      </span>
    </div>
  );
}
