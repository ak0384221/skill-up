import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function VibeHivesUserCard({ user }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <img
        src={user?.profilePic?.[user.profilePic.length - 1]?.pictureUrl}
        alt=""
        className="size-10 object-cover rounded-full"
      />
      <h3>{currentUser.uid === user?.id ? "You" : user?.username}</h3>
    </>
  );
}
