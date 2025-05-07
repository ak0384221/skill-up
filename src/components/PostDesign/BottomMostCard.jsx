import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";

export default function BottomMostCard() {
  return (
    <div className="lower pt-3   bg-[#242526] flex  justify-evenly items-center ">
      <span className="w-1/3   flex justify-center items-center  ">
        <FaHeart className=" w-1/2   text-3xl text-white hover:cursor-pointer p-1" />
        <span className="text-white">10</span>
      </span>
      <span className="w-1/3   flex justify-center items-center  ">
        <FaShare className=" w-1/2   text-3xl text-white hover:cursor-pointer p-1" />
        <span className="text-white">1</span>
      </span>
    </div>
  );
}
