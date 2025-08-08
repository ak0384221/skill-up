//local
import { TfiComment } from "react-icons/tfi";

import { useContext, useRef, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart, IoMdSend } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
// import { FetchingContext } from "../../Context/FetchingContext";
import Comment from "../Micro/comment";
import Button from "../shared/Button";
import { updateLike, addComment } from "../../utils/postsCRUD";
//external

export default function BottomMostCard({ post }) {
  const { authData } = useContext(AuthContext);
  const [clickedComment, setClickedComment] = useState(false);
  const commentsRef = useRef();
  const hasReacted = post?.reactions?.some(
    (reaction) => reaction?.uid === authData?.currentUser.uid
  );

  return (
    <div className="">
      <div className="lower  h-[3.5rem]  p-2 text-white flex justify-evenly items-center  w-full mx-auto ">
        <span
          onClick={() => {
            updateLike(post, authData);
          }}
          className={` flex justify-center hover:bg-[#282b28] rounded-md items-center w-1/3   cursor-pointer h-full    transition-colors 
            `}
        >
          {hasReacted ? (
            <IoMdHeart className="text-3xl " />
          ) : (
            <CiHeart className="text-3xl  " />
          )}

          <span className="mx-3 text-lg">{post.reactions?.length}</span>
        </span>
        <span
          onClick={() => {
            setClickedComment(!clickedComment);
          }}
          className={` flex justify-center items-center w-1/3   cursor-pointer h-full    transition-colors text-2xl hover:bg-[#282b28] rounded-md `}
        >
          <TfiComment />
        </span>
      </div>
      <div className="commentList ">
        {post.comments?.map((cmnt, index) => (
          <Comment key={index} data={cmnt} />
        ))}
      </div>
      <div
        className={`${
          clickedComment ? " min-h-[5rem] h-max " : "h-0"
        } overflow-hidden`}
      >
        <div className="send comment flex justify-evenly items-center">
          <textarea
            ref={commentsRef}
            type="text"
            placeholder="Enter your comment"
            className="border-b text-white my-2 border-[#707070] resize-none w-5/6  px-2 focus:outline-0 placeholder:text-[#9c9c9c]"
          />
          <IoMdSend
            onClick={() => {
              setClickedComment(false);
              addComment(commentsRef.current.value, post, authData);
            }}
            className=" text-white text-[2rem] active:scale-85 cursor-pointer transition-all "
          />
        </div>
      </div>
    </div>
  );
}
