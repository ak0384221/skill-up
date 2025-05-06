import { useContext } from "react";
import { FaHome, FaPen, FaVideo, FaImage, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
export default function Header() {
  const { logOutAuth } = useContext(AuthContext);
  return (
    <>
      <header className=" p-4  flex justify-between items-center">
        {/* Logo */}
        <div className="text-white tracking-wider font-Roboto font-extrabold text-2xl">
          Skill<span className="text-blue-500">Up</span>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6">
          <Link to="/posts" className="text-white hover:text-blue-500">
            <FaHome className="text-2xl" />
            <span className="sr-only">Home</span>
          </Link>
          <Link to="/create-post" className="text-white hover:text-blue-500">
            <FaPen className="text-2xl" />
            <span className="sr-only">Create Post</span>
          </Link>
          <Link to="/reels" className="text-white hover:text-blue-500">
            <FaVideo className="text-2xl" />
            <span className="sr-only">Videos</span>
          </Link>
          <Link to="/images" className="text-white hover:text-blue-500">
            <FaImage className="text-2xl" />
            <span className="sr-only">Images</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="text-white hover:text-blue-500 cursor-pointer">
          <FaSignOutAlt onClick={logOutAuth} className="text-2xl" />
          <span className="sr-only">Logout</span>
        </div>
      </header>
    </>
  );
}
