export default function PostSkeleton() {
  return (
    <>
      <div className="w-7/8 mx-auto h-[50vh] p-2 mt-10  bg-[#131313] rounded-2xl animate-pulse">
        {/* Top Section */}
        <div className="top h-[20%]   flex justify-between items-center px-4">
          <div className="left w-2/5 h-3/6  bg-[#1a1a1a] animate-pulse rounded"></div>
          <div className="right flex justify-center items-center gap-2">
            <div className="w-10 h-10  bg-[#1a1a1a] animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="middle w-full h-[60%] bg-[#1a1a1a] animate-pulse  "></div>

        {/* Bottom Section */}
        <div className="bottom h-[20%]  flex justify-evenly items-center  ">
          <div className="left w-1/3 rounded-sm  h-1/2  bg-[#1a1a1a] animate-pulse"></div>
          <div className="right w-1/3 rounded-sm h-1/2  bg-[#1a1a1a] animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
