import useUserProfile from "../../hooks/useUserProfile";

export default function Comment({ data }) {
  const { user, userPosts } = useUserProfile(data.uid);

  return (
    <>
      <div className="comments w-full py-2 mx-auto  flex justify-center items-center  gap-3 p-1 my-3">
        <div className="left size-9 overflow-hidden rounded-full ">
          <img
            src={user?.profilePic?.[user.profilePic.length - 1]?.pictureUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="right w-5/6 ">
          <p className="font-bold">{user?.username || "Anonymous"}</p>
          <p className="font-light text-sm">{data?.comment || ""}</p>
        </div>
      </div>
    </>
  );
}
