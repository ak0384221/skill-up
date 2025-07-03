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

//external
export default function Header() {
  const { logOutAuth, currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    logOutAuth(); // or your logout logic
  };
  return (
    <>
      <header className="p-4 mb-[10vh] flex justify-between items-center overflow-hidden w-full bg-[#2a2c2a]">
        {/* Logo */}
        <Link to="/" className="text-4xl f  font-cookie text-gradient-purple">
          Vibehive
        </Link>

        {/* Navigation */}

        {currentUser && (
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
              to={`/vibehives/user/${currentUser.uid}`}
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
              <HiLogout
                onClick={() => {
                  setShowModal(true);
                }}
                title="Log out"
                className="size-9 text-white  flex justify-center items-center rounded-sm bg-gradient-to-r from-[#f3cb5e] to-[#f04a4a]"
              />
              <LogoutModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleLogout}
              ></LogoutModal>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
