import { useContext } from "react";
//built-in
import { FetchingContext } from "../../Context/FetchingContext";
import { AuthContext } from "../../Context/AuthContext";
//local
import { CiTimer } from "react-icons/ci";

import { RxCross2 } from "react-icons/rx";
import { RiEdit2Fill } from "react-icons/ri";
import { LiaUndoAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//external
export default function TopMostInfoCard({ post, isEditing, setIsEditing }) {
  const { removePost } = useContext(FetchingContext);
  const { currentUser } = useContext(AuthContext);
  dayjs.extend(relativeTime);

  // Example usage:
  const timeAgo = post?.createdAt?.toDate
    ? dayjs(post.createdAt.toDate()).fromNow()
    : "some time ago";

  return (
    <div className="upper-Info-Card flex   w-full   justify-between items-center max-h-max bg-transparent px-2  mt-4  h-max ">
      <div className="left h-full  p-1 ">
        <div className="">
          <Link
            className="hover:underline font-Inter  text-2xl font-extrabold text-gradient-sunset"
            to={`/vibehives/user/${post.uid}`}
          >
            {post.username}
          </Link>

          <span className="text-[10px]  font-playwright mx-2">
            {timeAgo} <CiTimer className="inline-block text-[14px]" />
          </span>
        </div>
      </div>

      <div className="right    gap-2  flex justify-evenly items-center">
        {currentUser.uid === post.uid &&
          (isEditing ? (
            <LiaUndoAltSolid
              className=" text-2xl hover:scale-105 transition-all  text-white  bg-gradient-to-r from-[#188cda]  to-[#21dfc5] hover:cursor-pointer p-1.25 rounded-full  font-extrabold "
              onClick={() => setIsEditing(!isEditing)}
            />
          ) : (
            <RiEdit2Fill
              onClick={() => setIsEditing(!isEditing)}
              className=" text-4xl text-white hover:cursor-pointer p-1.25 rounded-full hover:scale-105 transition-all bg-gradient-to-r from-[#44c907]  to-[#153ec4]"
            />
          ))}
        {currentUser.uid === post.uid && (
          <RxCross2
            onClick={() => {
              removePost(post.id, post.pictureURL);
            }}
            className=" text-2xl text-white  bg-gradient-to-r from-[#ec1010]  to-[#e01067b0] hover:cursor-pointer p-1.25 rounded-full hover:scale-105 transition-all"
          />
        )}
      </div>
    </div>
  );
}
