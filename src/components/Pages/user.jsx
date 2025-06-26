import { useParams } from "react-router-dom";
import PageLoader from "../shared/pageLoader";

import { FaUpload } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

import SinglePostCard from "../PostDesign/CompleteSinglePostItem";
import useUserProfile from "../../hooks/useUserProfile";
import ShowProfileInfo from "../Micro/showProfileInfo";
import { GrUploadOption } from "react-icons/gr";
import { useContext, useEffect } from "react";

import { useState } from "react";
import { FetchingContext } from "../../Context/FetchingContext";
import { AuthContext } from "../../Context/AuthContext";

export default function User() {
  const { updateUserImageArray } = useContext(FetchingContext);
  const { currentUser } = useContext(AuthContext);

  const { id } = useParams();
  const { user, userPosts } = useUserProfile(id);
  const [files, setFiles] = useState(null);
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleOnchangeImg(evt) {
    evt.preventDefault();
    setFiles(evt.target.files[0]);
    const file = evt.target.files[0];
    if (!file) return;

    const objUrl = URL.createObjectURL(file);
    setPreview(objUrl);
  }
  function handleOnchangeImgCover(evt) {
    evt.preventDefault();
    setCover(evt.target.files[0]);
    const file = evt.target.files[0];
    if (!file) return;

    const objUrl = URL.createObjectURL(file);
    setCoverPreview(objUrl);
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      if (cover) {
        URL.revokeObjectURL(cover);
      }
    };
  }, [preview]);

  return (
    <div className="w-full min-h-screen mt-[12vh]">
      {user ? (
        <div className="w-full  ">
          <div className="cover bg-[rgb(7,7,7)] dp w-full md:w-2/3 lg:1/2  h-[40vh] md:h-[40vh] lg:h-[50vh]  mx-auto relative">
            <img
              className={`h-full w-full object-cover  `}
              src={
                coverPreview ||
                user?.coverPic?.[user.coverPic.length - 1]?.pictureUrl
              }
              alt=""
            />
            {currentUser.uid === id && (
              <div className="addCover  ">
                <div className="add absolute bottom-2 gap-[10vh] right-2   flex  items-center cursor-pointer opacity-50 transition-opacity  p-1.5 hover:opacity-100 b border-blue-500 rounded-full">
                  {cover ? (
                    <>
                      <IoCloseCircle
                        onClick={() => {
                          setCover(null);
                          setCoverPreview(null);
                          console.log("cliced cancel");
                        }}
                        className="text-3xl text-red-600 cursor-pointer bg-white rounded-full hover:scale-110 transition-all"
                      />

                      <FaCheckCircle
                        className="text-blue-500 text-3xl   cursor-pointer bg-white rounded-full hover:scale-110 transition-all"
                        onClick={async (e) => {
                          await updateUserImageArray(id, cover, "coverPic");
                          setCover(null);
                        }}
                      />
                    </>
                  ) : (
                    <label
                      htmlFor="coverInput"
                      className="cursor-pointer inline-block"
                    >
                      <FaUpload className="text-4xl  text-blue-600 cursor-pointer bg-white rounded-full p-1" />
                    </label>
                  )}

                  <input
                    className=" w-full  p-1 px-3 text-pink-500 text-sm hidden"
                    id="coverInput"
                    type="file"
                    accept="image/*"
                    onChange={handleOnchangeImgCover}
                  />
                </div>
              </div>
            )}
            <div className="  profile pic size-40 absolute -bottom-10 left-1/2 transform -translate-x-1/2">
              <img
                src={
                  preview ||
                  user?.profilePic?.[user.profilePic.length - 1]?.pictureUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                className={`h-full w-full object-cover rounded-full ${
                  files && "border-4 border-purple-400"
                } `}
              />
              {currentUser.uid === id && (
                <div className="add absolute bottom-0 right-0 rounded-full  flex justify-center items-center opacity-50 transition-opacity  p-1.5 hover:opacity-100 bg-white">
                  {files ? (
                    <>
                      <IoCloseCircle
                        onClick={() => {
                          setFiles(null);
                          setPreview(null);
                        }}
                        className="text-3xl text-red-600 cursor-pointer"
                      />

                      <FaCheckCircle
                        className="text-blue-500 text-2xl cursor-pointer"
                        onClick={async (e) => {
                          await updateUserImageArray(id, files, "profilePic");
                          setFiles(null);
                        }}
                      />
                    </>
                  ) : (
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer inline-block"
                    >
                      <FaUpload className="text-2xl  text-blue-500 cursor-pointer" />
                    </label>
                  )}

                  <input
                    className=" w-full  p-1 px-3 text-pink-500 text-sm hidden"
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleOnchangeImg}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="font-Inter  text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 bg-clip-text text-transparent  border-black w-max  p-2 mt-10 mx-auto ">
            <h2 className="font-Inter  text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 bg-clip-text text-transparent  border-black w-max inline-block ">
              {" "}
              {user && user.username}{" "}
            </h2>
            <b className="capitalize  font-Rochester tracking-wider  text-white text-[16px] mx-2">
              {user && user.nickName}
            </b>{" "}
          </div>

          {user && (
            <p className="mx-auto text-lg font-playwright text-center w-full md:w-1/2 text-white">
              {user.bio}
            </p>
          )}
          <ShowProfileInfo user={user} id={id} />

          {
            <div className="w-full mx-auto  md:w-1/2 ">
              {userPosts.map((post) => {
                return <SinglePostCard post={post} key={post.id} />;
              })}
            </div>
          }
        </div>
      ) : (
        <div className="size-[10rem] mx-auto mt-10 ">
          <PageLoader />
        </div>
      )}
    </div>
  );
}
