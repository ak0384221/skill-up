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
      className={`post w-full min-h-[50vh] border-1  ${
        (theme == "Dark" && "border-[#7a7575]") ||
        (theme == "Light" && "border-[#979691]") ||
        (theme === "System" && "dark:border-[#2c2c2c]")
      } mx-auto rounded-3xl flex flex-col justify-between overflow-hidden   mb-[5vh] mt-[5vh] `}
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
