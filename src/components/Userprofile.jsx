import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <>
      <div className="lg:w-[40vw]  h-screen w-full  rounded-sm  p-6  gap-4 ">
        <div className="w-1/3  mx-auto h-[25vh] flex justify-center items-center">
          <img
            src={`${currentUser.photoURL}`}
            alt="Profile"
            className="h-35 w-35 rounded-full object-cover "
          />
        </div>
        <div className="w-full  my-4 space-y-2 p-2 ">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#94b4f8] to-blue-700  bg-clip-text text-transparent ">
            {currentUser.displayName}
          </h2>
          <p className="text-sm ">Email: {currentUser.email}</p>
          <p className="text-sm ">
            Phone : {currentUser.phoneNumber ? currentUser.phoneNumber : "N/A"}
          </p>
          <p className="text-sm ">
            Email Verified : {currentUser.emailVerified ? "True" : "false"}
          </p>
        </div>
      </div>
    </>
  );
}
