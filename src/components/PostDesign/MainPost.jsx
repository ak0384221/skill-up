import { useContext, useState } from "react";
//built in
import { updatepost } from "../../utils/postsCRUD";
//local
import { RxCross2 } from "react-icons/rx";
import { IoCloudDoneSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
//external
export default function MainPost({ post, isEditing, setIsEditing, dispatch }) {
  const [editTitle, setEditTitle] = useState(post.title);

  function handleTitleChange(evt) {
    setEditTitle(evt.target.value);
  }

  function handleSave() {
    // Replace this with your actual Firestore update function
    updatepost(post.id, { title: editTitle }, dispatch)
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="post w-full  h-max  pt-2 ">
        <AnimatePresence>
          {isEditing ? (
            <>
              <motion.textarea
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                exit={{ opacity: 1, filter: "blur(0px)" }}
                rows="2"
                className="mx-3 w-[95%]   p-1 border-1 text-white border-gray-500 rounded-md"
                placeholder="Write something..."
                value={editTitle}
                onChange={handleTitleChange}
              ></motion.textarea>
              <div className="w-full  flex justify-between items-center gap-3 px-5  ">
                <IoCloudDoneSharp
                  className=" text-4xl cursor-pointer rounded-full hover:bg-white transition-colors  p-1 text-blue-500"
                  onClick={handleSave}
                />
                <RxCross2
                  onClick={() => setIsEditing(false)}
                  className=" text-2xl text-white  bg-gradient-to-r from-[#ec1010]  to-[#e01067b0] hover:cursor-pointer p-1.25 rounded-full hover:scale-105 transition-all"
                />
              </div>
            </>
          ) : (
            <>
              <p className=" h-max  px-3 text-[16px] text-[#f0f0f0]  mb-3">
                {post.title && post.title}
              </p>
            </>
          )}
        </AnimatePresence>
      </div>

      {post.pictureURL && (
        <div className="pic  w-full min-h-max h-[80vh] max-h-[40vh]">
          <img
            className="w-full h-full object-cover"
            src={`${post.pictureURL}`}
            loading="lazy"
            alt={`${post.title}`}
          />
        </div>
      )}
    </>
  );
}
