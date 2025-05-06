import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";

export default function BottomMostCard() {
  return (
    <div className="lower my-3  bg-[#242526] flex  justify-evenly items-center p-2 ">
      <span className="w-1/3 flex justify-center items-center  ">
        <AiFillLike className=" w-1/2 text-3xl text-white hover:cursor-pointer p-1" />
        <span className="text-white">10</span>
      </span>
      <span className="w-1/3 flex justify-center items-center  ">
        <FaShare className=" w-1/2 text-3xl text-white hover:cursor-pointer p-1" />
        <span className="text-white">1</span>
      </span>
    </div>
  );
}
