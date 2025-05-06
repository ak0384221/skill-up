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
      <div className="w-4/5 h-[90vh]  my-4">
        <p className="text-4xl text-center my-5 text-white">Create a post </p>
        <Form
          action="#"
          method="post"
          onSubmit={(evt) => {
            uploadPostFormHandler(evt, titleRef, pictureUrlRef, uploadPost);
          }}
          className=" p-8 w-5/6 mx-auto border-1 rounded-sm border-[#757373]"
        >
          <div className="mb-4">
            <label className="block mb-1 text-gray-200 font-Inter font-light">
              What's on your mind?
            </label>
            <textarea
              rows="6"
              ref={titleRef}
              className="w-full p-2 border text-white font-Roboto font-normal border-gray-500 rounded resize-none placeholder:text-gray-300 placeholder:font-light placeholder:font-Inter placeholder:text-sm"
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-200 font-Inter font-light">
              Picture url
            </label>
            <textarea
              rows="2"
              ref={pictureUrlRef}
              className="w-full p-2 border text-white font-Roboto font-normal border-gray-500 rounded resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 cursor-pointer text-white px-4 py-2 w-full rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}
