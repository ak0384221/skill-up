import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
//built-in
import { AuthContext } from "../../Context/AuthContext";
import LogoutModal from "../Modal/logOUtModal";
//local
import { FaHeartCirclePlus } from "react-icons/fa6";
import { HiLogout } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { SlFeed } from "react-icons/sl";
import { FaFacebookMessenger } from "react-icons/fa6";
import { logOutAuth } from "../../utils/authRelated";
import { MdOutbound } from "react-icons/md";
//external
export default function Header() {
  const { authData } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    logOutAuth(); // or your logout logic
  };
  return (
    <>
      {authData?.currentUser && (
        <header className="p-4 mb-[10vh] flex justify-between items-center overflow-hidden w-full bg-[#141414]">
          {/* Logo */}
          <Link to="/" className="text-4xl f  font-cookie text-white">
            Vibehive
          </Link>

          {/* Navigation */}

          <nav className="flex space-x-2">
            <NavLink
              to="/"
              title="feed"
              className={({ isActive }) =>
                `size-9 bg-gradient-to-r from-[#faa94d] to-[#ff0f06] flex justify-center items-center rounded-full active:scale-115 transition-all p-1.25 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500  "
                    : "bg-gradient-to-r from-[#faa94d] to-[#ff0f06] "
                }`
              }
            >
              <SlFeed className="size-7 p-1 text-white" />
            </NavLink>

            <NavLink
              to="/create-post"
              title="create post"
              className={({ isActive }) =>
                `size-9  flex justify-center items-center rounded-full active:scale-115 transition-all  ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500   "
                    : "bg-gradient-to-r from-[#faa94d] to-[#ff0f06]"
                }`
              }
            >
              <FaHeartCirclePlus className="size-7 p-1 text-white" />
            </NavLink>

            <NavLink
              to={`/vibehives/user/${authData?.currentUser?.uid}`}
              title="user profile"
              className={({ isActive }) =>
                `size-9 bg-gradient-to-r from-[#faa94d] to-[#ff0f06] flex justify-center items-center rounded-full active:scale-115 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500    "
                    : "bg-gradient-to-r from-[#faa94d] to-[#ff0f06]"
                }`
              }
            >
              <FaUser className="size-7 p-1 text-white" />
            </NavLink>

            <NavLink
              to="/messenger"
              title="messenger"
              className={({ isActive }) =>
                `size-9 bg-gradient-to-r from-[#faa94d] to-[#ff0f06] flex justify-center items-center rounded-full active:scale-115 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500    "
                    : "bg-gradient-to-r from-[#faa94d] to-[#ff0f06]"
                }`
              }
            >
              <FaFacebookMessenger className="size-7 p-1 text-white" />
            </NavLink>

            <div className="cursor-pointer ">
              <MdOutbound
                onClick={() => {
                  setShowModal(true);
                }}
                title="Log out"
                className="size-10 text-white  flex justify-center items-center rounded-sm active:scale-85 transition-all"
              />
              <LogoutModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleLogout}
              ></LogoutModal>
            </div>
          </nav>
        </header>
      )}
    </>
  );
}
