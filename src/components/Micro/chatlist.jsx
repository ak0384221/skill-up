import { Link } from "react-router-dom";
import VibeHivesUserCard from "./vibehivesUserCard";

export default function ChatList({ vibehiveUser }) {
  return (
    <div className="left min-h-screen h-max mt-5  ">
      <h1 className="text-5xl text-center tracking-wide  font-cookie  px-2   font-bold mb-5">
        Messenger
      </h1>
      <ul className="border border-[#494949] p-2 rounded-sm">
        {vibehiveUser.map((user, index) => (
          <Link key={index} to={`/messenger/${user?.id}`}>
            <li
              className="flex cursor-pointer items-center px-3 gap-2 hover:bg-[#282b28] mx-2 p-1 rounded-sm py-2 transition-colors"
              key={index}
            >
              <VibeHivesUserCard user={user} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
