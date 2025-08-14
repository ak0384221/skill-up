import { useContext } from "react";
import { FaBriefcase, FaHome, FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ContextAPI } from "../../Context/ContextAPI";
import GradientBtn from "./Gradient button";

export default function ShowProfileInfo({ user, id }) {
  const { authData } = useContext(ContextAPI);

  return (
    <div className="w-full px-5 md:w-1/2 mx-auto space-y-4 my-[5vh] text-[#e7e4e4]">
      <ul className="space-y-3 ">
        {user?.worksAt && (
          <li className="flex items-center gap-2">
            <FaBriefcase className="text-blue-500 text-lg" />
            <span>
              <span className="">Works at</span>
              <span className=" px-1 py-0.5   ">
                <span>{user?.worksAt}</span>
              </span>
            </span>
          </li>
        )}

        {user?.location && (
          <li className="flex items-center gap-2">
            <FaHome className="text-blue-500 text-lg" />
            <span>
              <span className="">Lives in</span>
              <span className="px-1 py-0.5  ">{user?.location}</span>
            </span>
          </li>
        )}
        {user?.wentTo && (
          <li className="flex items-center gap-2">
            <FaSchool className="text-blue-500 text-lg" />
            <span>
              <span className="">Went to</span>
              <span className="px-1 py-0.5   ">{user?.wentTo}</span>
            </span>
          </li>
        )}
      </ul>

      {authData?.currentUser?.uid === id && (
        <GradientBtn>
          <Link
            to="/updateProfile"
            className="bg-black hover:bg-[#111111] transition-colors h-full w-full rounded-2xl px-2 py-1"
          >
            Click to Update your Profile
          </Link>
        </GradientBtn>
      )}
    </div>
  );
}
