import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { Form, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
//built-in
import Button from "../shared/Button";
import { uploadPostFormHandler } from "../../utils/uploadRelated";
import { AuthContext } from "../../Context/AuthContext";
//local

export default function CreatePost() {
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const pictureUrlRef = useRef(null);
  const { authData } = useContext(AuthContext);
  const username = authData?.currentUser.displayName;
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleOnchangePicture = useCallback(
    async (evt) => {
      const file = evt.target.files[0];
      if (!file) return;

      // Compression options
      const options = {
        maxSizeMB: 1, // maximum size in MB
        maxWidthOrHeight: 1080, // resize image if it's larger
        useWebWorker: true,
      };

      try {
        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Set file and preview
        setFiles(compressedFile);
        const objUrl = URL.createObjectURL(compressedFile);
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
    <>
      <div className="w-full md:w-2/3 lg:w-2/5 my-4 text-white p-5 mt-[12vh]">
        <p className="text-5xl text-center my-5  w-max mx-auto font-cookie">
          Create a post
        </p>
        <Form
          action="#"
          method="post"
          onSubmit={(evt) => {
            evt.preventDefault();

            uploadPostFormHandler(
              evt,
              titleRef,
              pictureUrlRef,
              username,
              files,
              authData?.currentUser.uid,
              navigate
            );
          }}
          className="w-full mx-auto  rounded-sm  p-2 "
        >
          <div className="mb-4">
            <label className="block mb-1 text-[#fffffff6] ">
              What's on your mind?
            </label>
            <textarea
              rows="3"
              ref={titleRef}
              className="w-full p-2 border font-normal border-[#adadad] rounded resize-none placeholder:text-[#838181] placeholder:font-light placeholder: placeholder:text-sm focus:outline-0 "
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-[#fffffff6]   ">
              Picture url
            </label>
            <textarea
              rows="2"
              placeholder="Paste the picture url"
              ref={pictureUrlRef}
              className="w-full p-2 border font-normal border-[#adadad] rounded resize-none placeholder:text-[#838181] placeholder:font-light placeholder: placeholder:text-sm focus:outline-0"
            ></textarea>
          </div>
          <center>Or</center>
          <div className="mb-4">
            <center>
              <label
                htmlFor="fileInput"
                className="cursor-pointer inline-block"
              >
                <RiUploadCloud2Fill className="mt-4 text-5xl p-2 rounded-full bg-[#696365]  hover:bg-[#fcfcfc] hover:text-[#181818] transition-all hover:border-0 active:scale-120" />
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
              <div className="picyPreview    h-auto min-h-[30vh] my-5 ">
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <Button className="font-Rochester text-lg" variant="light">
            Upload
          </Button>
          {/* {crudError && (
            <div className="w-full h-10 border border-red-300 my-2 font-bold text-red-500">
              {crudError}
            </div>
          )} */}
        </Form>
      </div>
    </>
  );
}
