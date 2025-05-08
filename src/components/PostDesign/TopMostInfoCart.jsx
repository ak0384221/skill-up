import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { FetchingContext } from "../../Context/FetchingContext";
import { RiEdit2Fill } from "react-icons/ri";
import { LiaUndoAltSolid } from "react-icons/lia";

export default function TopMostInfoCard({ post, isEditing, setIsEditing }) {
  const { removePost } = useContext(FetchingContext);
  return (
    <div className="upper-Info-Card flex   w-full   justify-between items-center max-h-max bg-transparent px-2  mt-4  h-[3.5rem]">
      <div className="left h-full       flex justify-center items-center gap-2 p-1 ">
        <a
          className="hover:underline font-Inter text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 bg-clip-text text-transparent"
          href=""
        >
          {post.username}
        </a>
      </div>
      <div className="right    gap-2  flex justify-evenly items-center">
        {isEditing ? (
          <LiaUndoAltSolid
            className=" text-2xl hover:scale-105 transition-all  text-white  bg-gradient-to-r from-[#188cda]  to-[#21dfc5] hover:cursor-pointer p-1.25 rounded-full  font-extrabold "
            onClick={() => setIsEditing(!isEditing)}
          />
        ) : (
          <RiEdit2Fill
            onClick={() => setIsEditing(!isEditing)}
            className=" text-4xl text-white hover:cursor-pointer p-1.25 rounded-full hover:scale-105 transition-all bg-gradient-to-r from-[#44c907]  to-[#153ec4]"
          />
        )}

        <RxCross2
          onClick={() => {
            removePost(post.id);
          }}
          className=" text-2xl text-white  bg-gradient-to-r from-[#ec1010]  to-[#e01067b0] hover:cursor-pointer p-1.25 rounded-full hover:scale-105 transition-all"
        />
      </div>
    </div>
  );
}
