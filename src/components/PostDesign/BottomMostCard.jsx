import { SettingContext } from "../../Context/SettingContext";
//local
import { TfiComment } from "react-icons/tfi";

import { useContext, useRef, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import { FetchingContext } from "../../Context/FetchingContext";
import Comment from "../Micro/comment";
import Button from "../shared/Button";

//external

export default function BottomMostCard({ post }) {
  const { updateLike, addComment } = useContext(FetchingContext);
  const { theme } = useContext(SettingContext);
  const [clickedLove, setClickedLove] = useState(false);
  const [clickedComment, setClickedComment] = useState(false);

  const commentsRef = useRef();

  return (
    <div className="">
      <div className="lower  h-[3.5rem]  p-2  flex justify-between items-center  w-full mx-auto gap-3">
        <span
          onClick={() => {
            setClickedLove(!clickedLove);
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
        <span
          onClick={() => {
            setClickedComment(!clickedComment);
          }}
          className={` flex justify-center items-center w-1/3  cursor-pointer h-full   rounded-md transition-colors text-2xl ${
            (theme == "Dark" && "hover:bg-[#0a0a0a]") ||
            (theme == "Light" && "hover:bg-[#d8d6d6]") ||
            (theme == "System" && "dark:hover:bg-[#0a0a0a]")
          }`}
        >
          <TfiComment />
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
      <div className="commentList ">
        {post.comments?.slice(0, 2).map((cmnt, index) => (
          <Comment key={index} data={cmnt} />
        ))}
      </div>
      <div
        className={`${
          clickedComment ? " min-h-[5rem] h-max " : "h-0"
        } overflow-hidden`}
      >
        <div className="send comment px-5">
          <textarea
            ref={commentsRef}
            type="text"
            placeholder="Enter your comment"
            className="border-b-1  w-full py-2 px-5 focus:outline-0 "
          />
          <Button
            variant="createPost"
            className="my-2"
            onClick={() => {
              addComment(commentsRef.current.value, post);
              setClickedComment(false);
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
