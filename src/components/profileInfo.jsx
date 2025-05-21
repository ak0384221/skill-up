import {
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaHeart,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";
export default function ProfileInfo() {
  return (
    <>
      <div className=" w-full mx-auto space-y-3">
        <h2 className="text-gradient-purple mx-auto mb-[5vh] w-max font-extrabold text-2xl text-center ">
          Customize Profile
        </h2>
        {/* Education */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FaGraduationCap className="text-blue-600" />
            <span>Education</span>
          </div>
          <button className="text-sm mt-2 text-blue-500 hover:underline">
            + Add school or college
          </button>
        </div>

        {/* Work */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FaBriefcase className="text-green-600" />
            <span>Work</span>
          </div>
          <button className="text-sm mt-2 text-blue-500 hover:underline">
            + Add workplace
          </button>
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FaMapMarkerAlt className="text-red-600" />
            <span>Location</span>
          </div>
          <button className="text-sm mt-2 text-blue-500 hover:underline">
            + Add location
          </button>
        </div>
      </div>
    </>
  );
}
