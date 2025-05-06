import { FaHome, FaPen, FaVideo, FaImage } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className=" text-white   my-10  w-full ">
        <hr className="text-gray-500 mb-5" />
        <div className="text-sm text-center ">
          © {new Date().getFullYear()} SkillUp. All rights reserved.
        </div>
      </footer>
    </>
  );
}
