import { FaHome, FaPen, FaVideo, FaImage } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className=" text-white py-4 px-6 mt-auto fixed bottom-0 w-full ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* App name */}

          {/* Copyright */}
          <div className="text-sm mt-2 md:mt-0">
            © {new Date().getFullYear()} SkillUp. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
