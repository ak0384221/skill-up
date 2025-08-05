const UserProfileSkeleton = () => {
  return (
    <div className="w-full min-h-screen mt-[12vh] animate-pulse">
      <div className="w-full">
        {/* Cover section */}
        <div className="cover bg-[rgb(90,89,89)] dp w-full md:w-2/3 lg:1/2 h-[40vh] md:h-[40vh] lg:h-[50vh] mx-auto relative">
          <div className="h-full w-full bg-gray-700" />

          {/* Profile image */}
          <div className="profile pic size-40 absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="h-full w-full bg-gray-600 rounded-full border-4 border-purple-400" />
          </div>
        </div>

        {/* Username + Nickname */}
        <div className="font-Inter text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 bg-clip-text text-transparent border-black w-max p-2 mt-10 mx-auto">
          <h2 className="font-Inter text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 bg-clip-text text-transparent border-black w-max inline-block">
            <div className="w-40 h-6 bg-gray-600 rounded" />
          </h2>
          <b className="capitalize font-Rochester tracking-wider text-white text-[16px] mx-2">
            <div className="w-24 h-4 bg-gray-500 rounded mt-2" />
          </b>
        </div>

        {/* Bio */}
        <div className="mx-auto text-lg font-playwright text-center w-full md:w-1/2 text-white mt-2">
          <div className="w-3/4 h-4 bg-gray-500 mx-auto rounded" />
        </div>

        {/* One post skeleton */}
        <div className="w-full mx-auto md:w-1/2 mt-10">
          <div className="bg-gray-700 p-4 rounded-lg shadow-md space-y-4">
            <div className=" flex justify-start items-center gap-2">
              <div className="size-8 rounded-full bg-gray-600  "></div>
              <div className="h-8 bg-gray-600 rounded w-4/6"></div>
            </div>

            <div className="h-8 bg-gray-500 rounded w-full"></div>

            <div className="h-[60vh] bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
