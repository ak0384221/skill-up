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
      <div className="w-full md:w-2/3 lg:w-2/5 my-4 font-Inter p-5">
        <p className="text-4xl text-center my-5 bg-gradient-to-r from-purple-500 via-purple-500  to-pink-500 bg-clip-text text-transparent">
          Create a post{" "}
        </p>
        <Form
          action="#"
          method="post"
          onSubmit={(evt) => {
            uploadPostFormHandler(evt, titleRef, pictureUrlRef, uploadPost);
          }}
          className="w-full mx-auto  rounded-sm  p-2 "
        >
          <div className="mb-4">
            <label className="block mb-1  bg-gradient-to-r from-blue-700  to-purple-700 bg-clip-text text-transparent  font-[500] ">
              What's on your mind?
            </label>
            <textarea
              rows="6"
              ref={titleRef}
              className="w-full p-2 border text-black font-normal border-[#cc93f3] rounded resize-none placeholder:text-[#838181] placeholder:font-light placeholder:font-Inter placeholder:text-sm focus:outline-blue-400"
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 bg-gradient-to-r from-blue-700  to-purple-700 bg-clip-text text-transparent  font-[500] ">
              Picture url
            </label>
            <textarea
              rows="2"
              ref={pictureUrlRef}
              className="w-full p-2 border text-black font-normal border-[#cc93f3] rounded resize-none placeholder:text-[#838181] placeholder:font-light placeholder:font-Inter placeholder:text-sm focus:outline-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className=" cursor-pointer text-white px-4 py-2 w-full rounded bg-gradient-to-r from-purple-500 to-pink-500  hover:from-purple-600 hover:to-pink-600   active:scale-97 transition"
          >
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}
