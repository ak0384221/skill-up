import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

export default function BottomMostCard() {
  return (
    <div className="lower  h-[3.5rem]  p-2  flex justify-center items-center gap-3 w-4/5 mx-auto ">
      <span className="flex justify-center items-center w-1/2 h-full gap-4 hover:bg-[#f1efef]  rounded-md transition-colors">
        <CiHeart className=" text-3xl " />
      </span>
      <span className="flex justify-center items-center w-1/2 h-full gap-4 hover:bg-[#f1efef] rounded-md transition-colors">
        <CiShare2 className=" text-3xl" />
      </span>
    </div>
  );
}
