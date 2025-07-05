import { useContext, useState } from "react";
//built-in
import { FetchingContext } from "../../Context/FetchingContext";
import { AuthContext } from "../../Context/AuthContext";
//local
import { CiTimer } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "motion/react";
import { RxCross2 } from "react-icons/rx";
import { RiEdit2Fill } from "react-icons/ri";
import { LiaUndoAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence } from "motion/react";
//external
export default function TopMostInfoCard({ post, isEditing, setIsEditing }) {
  const { removePost } = useContext(FetchingContext);
  const { currentUser } = useContext(AuthContext);
  const [openOptions, setOpenOptions] = useState(false);
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

          <span className="text-[10px] text-[#dfdfdf] font-playwright mx-2">
            <CiTimer className="inline-block text-[14px]" /> {timeAgo}
          </span>
        </div>
      </div>

      <div className="right cursor-pointer  gap-2  relative   ">
        <BsThreeDots
          onClick={() => {
            setOpenOptions(!openOptions);
          }}
          className="text-3xl  mx-4  text-white active:text-2xl transition-all"
        />
        <AnimatePresence>
          {openOptions ? (
            <motion.div
              exit={{ filter: "blur(10px)", opacity: 0, scale: 0.8 }}
              initial={{ filter: "blur(10px)", opacity: 0, scale: 0.8 }}
              animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="box  rounded-md absolute  top-[5vh] min-w-max w-[55vw] md:w-[30vw] lg:w-[20vw] right-0  bg-[#1b1b1b] text-white border border-[#7a7979]"
            >
              <ul className="w-full">
                {currentUser.uid === post.uid && (
                  <li
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setOpenOptions(!openOptions);
                    }}
                    className="py-3 hover:bg-[#242424] transition-colors   cursor-pointer  flex justify-center w-full  "
                  >
                    Edit post
                  </li>
                )}

                <li className="py-3 hover:bg-[#242424] transition-colors cursor-pointer  flex justify-center ">
                  Save post
                </li>
                <li className="py-3 hover:bg-[#242424] transition-colors cursor-pointer  flex justify-center ">
                  Unfollow user
                </li>
                <li className="py-3 hover:bg-[#242424] transition-colors cursor-pointer  flex justify-center ">
                  Block user
                </li>
                {currentUser.uid == post.uid && (
                  <li
                    onClick={() => {
                      removePost(post.id, post.pictureURL);
                    }}
                    className="py-3 hover:bg-[#242424] transition-colors cursor-pointer  flex justify-center "
                  >
                    Delete post
                  </li>
                )}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
