import { useContext, useState } from "react";
import { FetchingContext } from "../../Context/FetchingContext";
import { IoCloudDoneSharp } from "react-icons/io5";

export default function MainPost({ post, isEditing, setIsEditing }) {
  const { updatepost } = useContext(FetchingContext);
  const [editTitle, setEditTitle] = useState(post.title);

  function handleTitleChange(evt) {
    setEditTitle(evt.target.value);
  }

  function handleSave() {
    // Replace this with your actual Firestore update function
    console.log("Saving updated title:", editTitle);
    updatepost(post.id, { title: editTitle })
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="post w-full  h-max   text-[#3b3b3b] font-[400]">
        {isEditing ? (
          <>
            <textarea
              rows="2"
              className="w-full p-1 border-1 border-purple-400"
              placeholder="Write something..."
              value={editTitle}
              onChange={handleTitleChange}
            ></textarea>
            <div className="w-full  flex justify-end items-center ">
              <IoCloudDoneSharp
                className=" text-4xl cursor-pointer rounded-full hover:bg-white transition-colors  p-1 text-blue-500"
                onClick={handleSave}
              />
            </div>
          </>
        ) : (
          <>
            <p className=" h-max px-3  mb-2">
              {post.title === "" ? "No caption needed" : post.title}
            </p>
          </>
        )}
      </div>

      <div className="pic w-full min-h-max h-[80vh] max-h-screen">
        <img
          className="w-full h-full object-cover"
          src={`${post.pictureURL}`}
          alt=""
        />
      </div>
    </>
  );
}
