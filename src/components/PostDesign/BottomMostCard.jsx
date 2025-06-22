import { SettingContext } from "../../Context/SettingContext";
//local
import { TfiComment } from "react-icons/tfi";

import { useContext, useRef, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import { FetchingContext } from "../../Context/FetchingContext";

//external

export default function BottomMostCard({ post }) {
  const { updateLike, addComment } = useContext(FetchingContext);
  const { theme } = useContext(SettingContext);
  const [clicked, setClicked] = useState(false);
  const commentsRef = useRef();

  return (
    <div className="">
      <div className="lower  h-[3.5rem]  p-2  flex justify-center items-center  w-4/5 mx-auto ">
        <span
          onClick={() => {
            setClicked(!clicked);
            updateLike(post);
          }}
          className={` flex justify-center items-center w-1/3  cursor-pointer h-full   rounded-md transition-colors ${
            (theme == "Dark" && "hover:bg-[#0a0a0a]") ||
            (theme == "Light" && "hover:bg-[#d8d6d6]") ||
            (theme == "System" && "dark:hover:bg-[#0a0a0a]")
          }`}
        >
          {post.reactions && post.reactions.length > 0 ? (
            <IoMdHeart className="text-3xl text-[#e93838]" />
          ) : (
            <CiHeart className="text-3xl" />
          )}
          <span className="mx-3 text-lg">{post.reactions?.length}</span>
        </span>
        <span className="w-1/3 h-full flex justify-center items-center text-2xl  cursor-pointer">
          <TfiComment
            onClick={() => {
              setClicked(!clicked);
            }}
          />
        </span>
        <span
          className={`  flex justify-center items-center w-1/3  cursor-pointer h-full   rounded-md transition-colors ${
            (theme == "Dark" && "hover:bg-[#0a0a0a]") ||
            (theme == "Light" && "hover:bg-[#d8d6d6]") ||
            (theme == "System" && "dark:hover:bg-[#0a0a0a]")
          }`}
        >
          <CiShare2 className=" text-3xl " />
        </span>
      </div>
      <div
        className={`${
          clicked ? " min-h-[5rem] h-max " : "h-0"
        } overflow-hidden`}
      >
        <div className="">
          <textarea
            ref={commentsRef}
            type="text"
            placeholder="Enter your comment"
            className="border-b-1  w-full py-2 px-5 focus:outline-0 "
          />
          <button
            onClick={() => {
              addComment(commentsRef.current.value);
            }}
            className="border px-4 py-1 float-end my-2 rounded-md hover:bg-blue-600"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}
