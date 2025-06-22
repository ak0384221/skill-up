import { useContext } from "react";
import { FaBriefcase, FaHome, FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function ShowProfileInfo({ user, id }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full px-5 md:w-1/2 mx-auto space-y-4 my-[5vh]">
      <ul className="space-y-3">
        <li className="flex items-center gap-2">
          <FaBriefcase className="text-blue-500 text-lg" />
          <span>
            <span className="">Works at</span>{" "}
            <span className=" px-2 py-0.5 rounded font-playwright capitalize font-bold">
              {user?.worksAt || "empty"}
            </span>
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaHome className="text-blue-500 text-lg" />
          <span>
            <span className="">Lives in</span>{" "}
            <span className=" px-2 py-0.5 rounded font-playwright capitalize font-bold">
              {user?.location || "empty"}
            </span>
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaSchool className="text-blue-500 text-lg" />
          <span>
            <span className="">Went to</span>{" "}
            <span className=" px-2 py-0.5 rounded font-playwright capitalize font-bold">
              {user?.wentTo || "empty"}
            </span>
          </span>
        </li>
      </ul>

      {currentUser?.uid === id && (
        <Link
          to="/updateProfile"
          className=" mt-4 mx-auto w-max text-gradient-purple font-Rochester font-semibold text-3xl border  flex justify-center items-center py-2 gap-4 hover:gap-16 transition-all "
        >
          Update your Profile{" "}
          <FaAngleDoubleRight className="text-pink-500 text-2xl" />
        </Link>
      )}
    </div>
  );
}
