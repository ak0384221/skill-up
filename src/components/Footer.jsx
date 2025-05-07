import { FaHome, FaPen, FaVideo, FaImage } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className=" text-[#d265e7]   my-10  w-full ">
        <hr className="text-[#efaffc] mb-5" />
        <div className="text-sm text-center ">
          © {new Date().getFullYear()} SkillUp. All rights reserved.
        </div>
      </footer>
    </>
  );
}
