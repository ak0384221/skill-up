import { useContext, useState } from "react";
//built-in
import BottomMostCard from "./BottomMostCard";
import MainPost from "./MainPost";
import TopMostInfoCard from "./TopMostInfoCart";
import { SettingContext } from "../../Context/SettingContext";
//external
export default function SinglePostCard({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const { theme } = useContext(SettingContext);

  return (
    <div
      className={`post w-full min-h-[50vh] border-1 border-[#504f4f]  ${
        (theme === "Dark" && "bg-[#212222]") ||
        (theme === "Light" && "bg-[#f8f8f5ce]") ||
        (theme === "System" && "dark:bg-[#212222]")
      } mx-auto rounded-3xl flex flex-col justify-between overflow-hidden  mt-[2vh] mb-[5vh]  `}
    >
      <TopMostInfoCard
        post={post}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <MainPost post={post} isEditing={isEditing} setIsEditing={setIsEditing} />
      <BottomMostCard />
    </div>
  );
}
