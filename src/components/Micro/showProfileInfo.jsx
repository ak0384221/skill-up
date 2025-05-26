import { useContext } from "react";
import { FaBriefcase, FaHome, FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function ShowProfileInfo({ user, id }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full px-5 md:w-1/2 mx-auto space-y-4 my-[5vh]">
      <ul className="space-y-3">
        <li className="flex items-center gap-2">
          <span className="  w-max">
            Also known as <b className="capitalize">{user && user.nickName}</b>{" "}
          </span>
        </li>

        <li className="flex items-center gap-2">
          <FaBriefcase className="text-blue-500 text-lg" />
          <span>
            <span className="font-bold">Works at</span>{" "}
            <span className=" px-2 py-0.5 rounded">
              {user?.worksAt || "empty"}
            </span>
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaHome className="text-blue-500 text-lg" />
          <span>
            <span className="font-bold">Lives in</span>{" "}
            <span className=" px-2 py-0.5 rounded">
              {user?.location || "empty"}
            </span>
          </span>
        </li>
        <li className="flex items-center gap-2">
          <FaSchool className="text-blue-500 text-lg" />
          <span>
            <span className="font-bold">Went to</span>{" "}
            <span className=" px-2 py-0.5 rounded">
              {user?.wentTo || "empty"}
            </span>
          </span>
        </li>
      </ul>

      {currentUser?.uid === id && (
        <Link
          to="/updateProfile"
          className="inline-block mt-4 border px-4 py-1 bg-blue-600 rounded text-white hover:bg-blue-500 transition-colors"
        >
          Update your Profile
        </Link>
      )}
    </div>
  );
}
