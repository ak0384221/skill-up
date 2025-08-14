import { useContext } from "react";
import { ContextAPI } from "../../Context/ContextAPI";

export default function VibeHivesUserCard({ user }) {
  const { authData } = useContext(ContextAPI);

  return (
    <>
      <img
        src={user?.profilePic?.[user.profilePic.length - 1]?.pictureUrl}
        alt=""
        className="size-10 object-cover rounded-full"
      />
      <h3>{authData?.currentUser.uid === user?.id ? "You" : user?.username}</h3>
    </>
  );
}
