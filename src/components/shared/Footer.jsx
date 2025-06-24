import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Footer() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {currentUser && (
        <footer className={` text-[#d265e7]  py-5 bg-[#252725]  w-full `}>
          <div className="text-sm text-center text-[#7c7c7c] ">
            © 2025 Vibehive. All rights reserved.
          </div>
        </footer>
      )}
    </>
  );
}
