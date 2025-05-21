import { useContext, useRef, useState } from "react";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { Form } from "react-router-dom";
//built-in
import Button from "../shared/Button";
import { FetchingContext } from "../../Context/FetchingContext";
import { uploadPostFormHandler } from "../../utils/helperFunctions";
import Loader from "../shared/loader";
import { AuthContext } from "../../Context/AuthContext";
//local

export default function CreatePost() {
  const { uploadPost, postLoading, crudError } = useContext(FetchingContext);
  const titleRef = useRef(null);

  const pictureUrlRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const username = currentUser.displayName;
  const [files, setFiles] = useState(null);

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-2/5 my-4  p-5">
        <p className="text-4xl text-center my-5 text-gradient-purple font-bold w-max mx-auto">
          Create a post
        </p>
        <Form
          action="#"
          method="post"
          onSubmit={(evt) => {
            uploadPostFormHandler(
              evt,
              titleRef,
              pictureUrlRef,
              uploadPost,
              username,
              files,
              currentUser.uid
            );
          }}
          className="w-full mx-auto  rounded-sm  p-2 "
        >
          <div className="mb-4">
            <label className="block mb-1  bg-gradient-to-r from-blue-700  to-purple-700 bg-clip-text text-transparent   ">
              What's on your mind?
            </label>
            <textarea
              rows="3"
              ref={titleRef}
              className="w-full p-2 border font-normal border-[#cc93f3] rounded resize-none placeholder:text-[#838181] placeholder:font-light placeholder: placeholder:text-sm focus:outline-blue-400"
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 bg-gradient-to-r from-blue-700  to-purple-700 bg-clip-text text-transparent   ">
              Picture url
            </label>
            <textarea
              rows="2"
              placeholder="Paste the picture url"
              ref={pictureUrlRef}
              className="w-full p-2 border font-normal border-[#cc93f3] rounded resize-none placeholder:text-[#838181] placeholder:font-light placeholder: placeholder:text-sm focus:outline-blue-400"
            ></textarea>
          </div>
          <center>Or</center>
          <div className="mb-4">
            <center>
              <label
                htmlFor="fileInput"
                className="cursor-pointer inline-block"
              >
                <RiUploadCloud2Fill className="mt-4 text-5xl p-1 rounded-full text-white bg-gradient-to-r from-purple-500 via-purple-500 to-pink-500 hover:opacity-85 transition-opacity" />
              </label>
              <br />
              <input
                className=" w-full  p-1 px-3 text-pink-500 text-sm "
                onChange={(e) => {
                  e.preventDefault();
                  setFiles(e.target.files[0]);
                }}
                id="fileInput"
                type="file"
                accept="image/*"
              />
            </center>
          </div>

          <Button variant="light">{postLoading ? <Loader /> : "Post"}</Button>
          {crudError && (
            <div className="w-full h-10 border border-red-300 my-2 font-bold text-red-500">
              {crudError}
            </div>
          )}
        </Form>
      </div>
    </>
  );
}
