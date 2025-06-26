import { Link } from "react-router-dom";
import useUserProfile from "../../hooks/useUserProfile";

export default function Comment({ data }) {
  const { user, userPosts } = useUserProfile(data.uid);

  return (
    <>
      <div className="comments w-full py-2 mx-auto text-[#fffffff5] flex justify-center items-center  gap-3 p-1 my-3">
        <div className="left size-9 overflow-hidden rounded-full ">
          <Link to={`/vibehives/user/${data.uid}`}>
            <img
              src={user?.profilePic?.[user.profilePic.length - 1]?.pictureUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <div className="right w-5/6 ">
          <Link to={`/vibehives/user/${data.uid}`}>
            <p className="font-bold">{user?.username || "Anonymous"}</p>
          </Link>
          <p className="font-light text-sm">{data?.comment || ""}</p>
        </div>
      </div>
    </>
  );
}
