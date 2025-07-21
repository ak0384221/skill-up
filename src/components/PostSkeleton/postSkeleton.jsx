export default function PostSkeleton() {
  return (
    <div className="w-7/8 mx-auto h-[90vh] rounded-2xl mt-10 overflow-hidden animate-pulse ">
      {/* Top Section */}
      <div className="top h-[12%] bg-[#2A2C2A] flex justify-between items-center px-4">
        <div className="left w-2/5 h-3/6 bg-[#3a3b3b] rounded"></div>
        <div className="right flex justify-center items-center gap-2">
          <div className="w-10 h-10 bg-[#5c5d5e] rounded-full"></div>
          <div className="w-6 h-6 bg-[#5c5d5e] rounded-full"></div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle w-full h-[76%] bg-[#3a3b3b]  "></div>

      {/* Bottom Section */}
      <div className="bottom h-[12%] bg-[#2A2C2A] flex justify-evenly items-center  ">
        <div className="left w-1/3 rounded-sm  h-1/2 bg-[#3a3b3b] "></div>
        <div className="right w-1/3 rounded-sm h-1/2 bg-[#3a3b3b] "></div>
      </div>
    </div>
  );
}
