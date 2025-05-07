import { useState } from "react";
import BottomMostCard from "./BottomMostCard";
import MainPost from "./MainPost";
import TopMostInfoCard from "./TopMostInfoCart";

export default function SinglePostCard({ post }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="post w-full min-h-[50vh] border py-4  mx-auto rounded-xl flex flex-col justify-between overflow-hidden  bg-[#242526] my-4 ">
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
