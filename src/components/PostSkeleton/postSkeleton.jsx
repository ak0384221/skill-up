export default function PostSkeleton() {
  console.log("skeleton is rendering");
  return (
    <div className="w-full h-[90vh] rounded-2xl mt-10 overflow-hidden animate-pulse ">
      {/* Top Section */}
      <div className="top h-[12%] bg-[#c2ccce] flex justify-between items-center px-4">
        <div className="left w-2/5 h-4/6 bg-[#d1dadd] rounded"></div>
        <div className="right flex justify-center items-center gap-2">
          <div className="w-10 h-10 bg-[#d1dadd] rounded-full"></div>
          <div className="w-6 h-6 bg-[#d1dadd] rounded-full"></div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle w-full h-[76%] bg-[#b6bebe]  "></div>

      {/* Bottom Section */}
      <div className="bottom h-[12%] bg-[#c2ccce] flex justify-evenly items-center  ">
        <div className="left w-1/3  h-3/5 bg-[#d1dadd] "></div>
        <div className="right w-1/3 h-3/5 bg-[#d1dadd] "></div>
      </div>
    </div>
  );
}
