import { useState } from "react";
import BottomMostCard from "./BottomMostCard";
import MainPost from "./MainPost";
import TopMostInfoCard from "./TopMostInfoCart";

export default function SinglePostCard({ post }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="post w-full min-h-[50vh] border-1 border-[#d8d8d8]  mx-auto rounded-3xl flex flex-col justify-between overflow-hidden   mb-[5vh] mt-[5vh] ">
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
