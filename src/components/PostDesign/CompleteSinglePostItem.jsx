import { useState } from "react";
//built-in
import BottomMostCard from "./BottomMostCard";
import MainPost from "./MainPost";
import TopMostInfoCard from "./TopMostInfoCart";
//external
export default function SinglePostCard({ post }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={`post w-full  border border-[#504f4f]  
       mx-auto rounded-3xl flex flex-col justify-between   mt-[2vh] mb-[5vh]  `}
    >
      <TopMostInfoCard
        post={post}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <MainPost post={post} isEditing={isEditing} setIsEditing={setIsEditing} />
      <BottomMostCard post={post} />
    </div>
  );
}
