import { useContext, useState } from "react";
// built-in
import { AuthContext } from "../../Context/AuthContext";

// local
import { CiTimer } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { removePost } from "../../utils/postsCRUD";

// external
export default function TopMostInfoCard({ post, isEditing, setIsEditing }) {
  const { authData } = useContext(AuthContext);
  const [openOptions, setOpenOptions] = useState(false);

  dayjs.extend(relativeTime);

  const timeAgo = post?.createdAt?.toDate
    ? dayjs(post.createdAt.toDate()).fromNow()
    : "some time ago";

  return (
    <div className="upper-Info-Card flex w-full relative justify-between items-center bg-transparent px-2 mt-4 ">
      {/* Left */}
      <div className="left p-1">
        <div>
          <Link
            className="hover:underline font-Inter text-xl md:text-2xl font-extrabold text-gradient-sunset"
            to={`/vibehives/user/${post.uid}`}
          >
            {post.username}
          </Link>

          <span className="text-[10px] text-[#dfdfdf] font-playwright mx-2 inline-flex items-center">
            <CiTimer className="inline-block text-[14px] mr-1" /> {timeAgo}
          </span>
        </div>
      </div>

      {/* Right (options button) */}
      <div className="right cursor-pointer">
        <BsThreeDots
          onClick={() => setOpenOptions(!openOptions)}
          className="text-3xl mx-4 text-white hover:text-gray-300 active:scale-95 transition-transform"
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {openOptions && (
          <motion.div
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="absolute top-full mt-2 right-2 bg-[#1b1b1b] text-white border border-[#7a7979] rounded-lg shadow-lg z-50 w-[55vw] md:w-[30vw] lg:w-[20vw] max-h-60 overflow-y-auto"
          >
            <ul className="divide-y divide-[#2b2b2b] ">
              {authData?.currentUser.uid === post.uid && (
                <li
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setOpenOptions(false);
                  }}
                  className="py-3 px-4 hover:bg-[#242424] transition-colors cursor-pointer"
                >
                  Edit post
                </li>
              )}

              <li className="py-3 px-4 hover:bg-[#242424] transition-colors cursor-pointer">
                Remove for me
              </li>

              {authData?.currentUser.uid === post.uid && (
                <li
                  onClick={() => removePost(post.id, post.pictureURL)}
                  className="py-3 px-4 hover:bg-[#3a0f0f] transition-colors cursor-pointer text-red-400"
                >
                  Delete post
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
