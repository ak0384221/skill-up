import { useContext } from "react";
import { FaPen, FaVideo, FaImage, FaSignOutAlt } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { SiMediamarkt } from "react-icons/si";
import { Form, NavLink } from "react-router-dom";

import { SlFeed } from "react-icons/sl";

import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Button from "../shared/Button";
export default function Header() {
  const { logOutAuth, authorized } = useContext(AuthContext);
  return (
    <>
      <header className=" p-4  flex justify-between items-center font-Inter w-full bg-white   ">
        {/* Logo */}
        <Link
          to="/posts"
          className="text-3xl  font-Fugaz bg-gradient-to-r from-purple-500 via-purple-500  to-pink-500 bg-clip-text text-transparent"
        >
          Vibehive
        </Link>

        {/* Navigation */}

        {authorized && (
          <nav className="flex space-x-4">
            <NavLink
              to="/posts"
              title="feed"
              className={({ isActive }) =>
                `size-9 bg-gradient-to-r from-[#faa94d] to-[#ff0f06] flex justify-center items-center rounded-full p-1.25 ${
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
                `size-9  flex justify-center items-center rounded-full ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500    "
                    : "bg-gradient-to-r from-[#faa94d] to-[#ff0f06]"
                }`
              }
            >
              <FaHeartCirclePlus className="size-7 p-1 text-white" />
            </NavLink>

            <NavLink
              to="/reels"
              title="reels"
              className={({ isActive }) =>
                `size-9 bg-gradient-to-r from-[#faa94d] to-[#ff0f06] flex justify-center items-center rounded-full ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500    "
                    : "bg-gradient-to-r from-[#faa94d] to-[#ff0f06]"
                }`
              }
            >
              <SiMediamarkt className="size-7 p-1 text-white" />
            </NavLink>
            <div className=" cursor-pointer ">
              {/* <Form
                className="border"
                method="get"
                action="#"
                onSubmit={logOutAuth}
              > */}
              <Button onClick={logOutAuth} variant="light">
                Log out
              </Button>
              {/* </Form> */}
            </div>
          </nav>
        )}

        {/* Logout */}
      </header>
    </>
  );
}
