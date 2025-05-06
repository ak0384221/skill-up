import { useContext, useRef } from "react";
import Button from "../shared/Button";
import { FetchingContext } from "../Context/FetchingContext";
import { Form } from "react-router-dom";
import { uploadPostFormHandler } from "../utils/helperFunctions";
export default function CreatePost() {
  const { uploadPost } = useContext(FetchingContext);
  const titleRef = useRef(null);
  const pictureUrlRef = useRef(null);

  return (
    <>
      <div className="w-4/5 h-[70vh]  my-3">
        <p className="text-4xl text-center my-5">Create a post </p>
        <Form
          action="#"
          method="post"
          onSubmit={(evt) => {
            uploadPostFormHandler(evt, titleRef, pictureUrlRef, uploadPost);
          }}
          className=" p-8 w-5/6 mx-auto border-1 rounded-sm border-[#272727]"
        >
          <div className="mb-4">
            <label className="block mb-1">What's on your mind?</label>
            <textarea
              rows="6"
              ref={titleRef}
              className="w-full p-2 border border-gray-300 rounded resize-none "
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Picture url</label>
            <textarea
              rows="2"
              ref={pictureUrlRef}
              className="w-full p-2 border border-gray-300 rounded resize-none "
              placeholder="picture url"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}
