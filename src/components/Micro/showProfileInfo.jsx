import { useContext } from "react";
import { FaBriefcase, FaHome, FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function ShowProfileInfo({ user, id }) {
  const { authData } = useContext(AuthContext);

  return (
    <div className="w-full px-5 md:w-1/2 mx-auto space-y-4 my-[5vh] text-[#e7e4e4]">
      <ul className="space-y-3 ">
        {user?.worksAt && (
          <li className="flex items-center gap-2">
            <FaBriefcase className="text-blue-500 text-lg" />
            <span>
              <span className="">Works at</span>
              <span className=" px-2 py-0.5 rounded capitalize font-bold">
                <span>{user?.worksAt}</span>
              </span>
            </span>
          </li>
        )}

        {user?.location && (
          <li className="flex items-center gap-2">
            <FaHome className="text-blue-500 text-lg" />
            <span>
              <span className="">Lives in</span>{" "}
              <span className=" px-2 py-0.5 rounded capitalize font-bold">
                {user?.location}
              </span>
            </span>
          </li>
        )}
        {user?.wentTo && (
          <li className="flex items-center gap-2">
            <FaSchool className="text-blue-500 text-lg" />
            <span>
              <span className="">Went to</span>{" "}
              <span className=" px-2 py-0.5 rounded capitalize font-bold">
                {user?.wentTo}
              </span>
            </span>
          </li>
        )}
      </ul>

      {authData?.currentUser?.uid === id && (
        <Link
          to="/updateProfile"
          className="bg-white w-full text-center font-semibold text-2xl"
        >
          <p className="my-6">Click to Update your Profile</p>
        </Link>
      )}
    </div>
  );
}
