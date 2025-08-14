import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
//built-in
import Button from "../shared/Button";
import { uploadPostFormHandler } from "../../utils/uploadRelated";
import { ContextAPI } from "../../Context/ContextAPI";
import Loader from "../shared/loader";
import { FiUpload } from "react-icons/fi";
import { PiHighDefinitionFill } from "react-icons/pi";
import GradientWrapper from "../Micro/GradientWrapper";
//local

export default function CreatePost() {
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const { authData } = useContext(ContextAPI);
  const username = authData?.currentUser.displayName;
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isHd, setIsHd] = useState(false);
  const [uploadData, setUploadData] = useState({
    isUploading: false,
    isError: null,
  });

  const handleOnchangePicture = useCallback(
    async (evt) => {
      const file = evt.target.files[0];
      if (!file) return;

      try {
        setFiles(file);
        const objUrl = URL.createObjectURL(file);
        setPreview(objUrl);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    },
    [setFiles, setPreview]
  );

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <GradientWrapper>
      <div className="w-full h-full bg-black rounded-xl px-4 py-5">
        <p className="text-5xl text-center  w-max mx-auto font-cookie pt-4 py-8">
          Create a post
        </p>
        <Form
          action="#"
          method="post"
          onSubmit={(evt) => {
            evt.preventDefault();

            setUploadData((prev) => {
              return { ...prev, isUploading: true };
            });

            uploadPostFormHandler(
              titleRef,
              files,
              authData,
              setUploadData,
              navigate,
              isHd
            );
          }}
          className="w-full mx-auto  rounded-sm  p-2 "
        >
          <div className="mb-4">
            <label className="block mb-1 text-[#b1afaff6] font-light ">
              What's on your mind?
            </label>
            <textarea
              rows="3"
              ref={titleRef}
              className="w-full p-2 border font-normal border-[#3a3a3a] rounded resize-none placeholder:text-[#838181] placeholder:font-light placeholder: placeholder:text-sm focus:outline-0 "
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="mb-4">
            <center>
              <label
                htmlFor="fileInput"
                className="cursor-pointer  bg-[#181818] w-max px-5 h-10 flex justify-center items-center rounded-3xl border-2 border-[#2848a1] hover:bg-[#0e0e0e] transition-colors font-light font-Roboto"
              >
                Select file
              </label>
              <br />
              <input
                className=" w-full font-cookie text-2xl  p-1 px-3 "
                onChange={handleOnchangePicture}
                id="fileInput"
                type="file"
                accept="image/*"
              />
            </center>
            {preview && (
              <div className="picyPreview  relative  h-auto min-h-[30vh] my-5 ">
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />

                <PiHighDefinitionFill
                  onClick={() => setIsHd(!isHd)}
                  className={`absolute top-0 right-0 m-2 cursor-pointer text-4xl text-black p-[2px] transition-opacity ${
                    isHd ? "opacity-100" : "opacity-50"
                  }`}
                />
              </div>
            )}
          </div>

          <Button variant={"dark"}>
            {uploadData?.isError ? (
              <span className=" text-red-700">
                {uploadData?.isError.message}
              </span>
            ) : uploadData?.isUploading ? (
              <Loader variant="white" />
            ) : (
              <>
                <FiUpload className="text-lg" /> Upload
              </>
            )}
          </Button>
        </Form>
      </div>
    </GradientWrapper>
  );
}
