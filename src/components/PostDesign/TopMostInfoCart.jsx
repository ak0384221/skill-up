import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { FetchingContext } from "../../Context/FetchingContext";
import { RiEdit2Fill } from "react-icons/ri";
import { LiaUndoAltSolid } from "react-icons/lia";

export default function TopMostInfoCard({ post, isEditing, setIsEditing }) {
  const { removePost } = useContext(FetchingContext);
  return (
    <div className="upper-Info-Card flex p-2  w-full  justify-between items-center h-20 ">
      <div className="left h-full min-w-32 w-max    flex justify-center items-center gap-2 p-1 ">
        <div className="img w-10 h-10  rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/584179/pexels-photo-584179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div>
          <div className="idname w-max text-gray-200 font-bold  px-1">
            <a className="hover:underline" href="">
              {post.username}
            </a>
          </div>
          <div className="flex gap-1 justify-end items-center  w-max px-1">
            <p className="time text-gray-300 font-light text-sm">5 hours ago</p>
          </div>
        </div>
      </div>

      <div className="right    gap-2  flex justify-evenly items-center">
        {isEditing ? (
          <LiaUndoAltSolid
            className=" text-4xl text-white hover:bg-[#3d3c3c] p-1.25 rounded-full transition-colors font-extrabold "
            onClick={() => setIsEditing(!isEditing)}
          />
        ) : (
          <RiEdit2Fill
            onClick={() => setIsEditing(!isEditing)}
            className=" text-4xl text-white hover:bg-[#3d3c3c] p-1.25 rounded-full transition-colors "
          />
        )}

        <RxCross2
          onClick={() => {
            removePost(post.id);
          }}
          className=" text-4xl text-white hover:bg-[#3d3c3c] p-1.25 rounded-full transition-colors "
        />
      </div>
    </div>
  );
}
