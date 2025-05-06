import { useContext, useState } from "react";
import { FetchingContext } from "../../Context/FetchingContext";

export default function MainPost({ post }) {
  const { updatepost } = useContext(FetchingContext);
  const [editTitle, setEditTitle] = useState(post.title);
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="post w-full h-max px-3 pb-3 text-gray-300 font-[400]">
        {isEditing ? (
          <>
            <textarea
              rows="2"
              className="w-full p-1 border"
              placeholder="Write something..."
              value={editTitle}
              onChange={handleTitleChange}
            ></textarea>
            <button
              className="mt-1 px-3 py-1 bg-blue-600 rounded"
              onClick={handleSave}
            >
              update
            </button>
          </>
        ) : (
          <>
            <p>{post.title}</p>
            <button
              className="mt-1 px-3 py-1 bg-gray-700 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
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
