const UserProfileSkeleton = () => {
  return (
    <div className="w-full min-h-screen ">
      <div className="w-full  ">
        {/* Cover section */}
        <div className="cover  dp w-full md:w-2/3 lg:1/2 h-[35vh] md:h-[40vh] lg:h-[50vh] mx-auto relative ">
          <div className="cover bg-neutral-800 w-full h-full"></div>
          {/* Profile image */}
          <div className="profile pic size-40 absolute -bottom-15 left-1/2 transform -translate-x-1/2 ">
            <div className="h-full w-full bg-neutral-700 rounded-full " />
          </div>
        </div>

        {/* Bio */}
        <div className=" w-full h-10 mt-[10vh] flex flex-col gap-2">
          <div className="h-3 bg-neutral-700  w-1/2 mx-auto animate-pulse"></div>
          <div className="h-3 bg-neutral-700  w-4/5 mx-auto animate-pulse"></div>

          <div className="h-3 bg-neutral-700  w-4/5 mx-auto animate-pulse"></div>
        </div>

        {/* One post skeleton */}
        <div className="w-full mx-auto md:w-1/2 mt-10">
          <div className="bg-neutral-800 p-4 rounded-lg shadow-md space-y-4 ">
            <div className=" flex justify-start items-center gap-2">
              <div className="size-8 rounded-full bg-neutral-700 animate-pulse "></div>
              <div className="h-6 bg-neutral-700  w-4/6 animate-pulse"></div>
            </div>
            <div className=" flex flex-col gap-2">
              <div className="h-2 bg-neutral-700  w-full animate-pulse"></div>

              <div className="h-2 bg-neutral-700  w-full animate-pulse"></div>
            </div>

            <div className="h-[30vh] bg-neutral-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
