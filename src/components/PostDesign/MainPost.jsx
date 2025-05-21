import { useContext, useState } from "react";
//built in
import { FetchingContext } from "../../Context/FetchingContext";
//local
import { IoCloudDoneSharp } from "react-icons/io5";
//external
export default function MainPost({ post, isEditing, setIsEditing }) {
  const { updatepost } = useContext(FetchingContext);
  const [editTitle, setEditTitle] = useState(post.title);

  function handleTitleChange(evt) {
    setEditTitle(evt.target.value);
  }

  function handleSave() {
    // Replace this with your actual Firestore update function
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
      <div className="post w-full  h-max  ">
        {isEditing ? (
          <>
            <textarea
              rows="2"
              className="mx-3 w-[95%]   p-1 border-1 border-gray-500 rounded-md"
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
            <p className=" h-max px-3 text-[16px]  mb-2">
              {post.title && post.title}
            </p>
          </>
        )}
      </div>

      {post.pictureURL && (
        <div className="pic w-full min-h-max h-[80vh] max-h-[40vh]">
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
