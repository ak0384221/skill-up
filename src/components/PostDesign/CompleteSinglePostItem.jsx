import { useContext, useState } from "react";
//built-in
import BottomMostCard from "./BottomMostCard";
import MainPost from "./MainPost";
import TopMostInfoCard from "./TopMostInfoCart";
//external
import { motion } from "motion/react";
export default function SinglePostCard({ post }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.7 }}
      className={`post w-full min-h-[50vh] border-1 border-[#504f4f]  
       mx-auto rounded-3xl flex flex-col justify-between overflow-hidden  mt-[2vh] mb-[5vh]  `}
    >
      <TopMostInfoCard
        post={post}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <MainPost post={post} isEditing={isEditing} setIsEditing={setIsEditing} />
      <BottomMostCard post={post} />
    </motion.div>
  );
}
