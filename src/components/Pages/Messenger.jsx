import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import ChatList from "../Micro/chatlist";
export default function Messenger() {
  const { vibehiveUser } = useContext(ChatContext);

  return (
    <div className="messenger  w-4/5  text-white mt-[12vh] h-max">
      <div className="w-full  py-2  ">
        <ChatList vibehiveUser={vibehiveUser} />
      </div>
    </div>
  );
}
