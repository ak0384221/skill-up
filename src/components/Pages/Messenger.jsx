import { useContext } from "react";
import ChatList from "../Micro/chatlist";
import { ContextAPI } from "../../Context/ContextAPI";
export default function Messenger() {
  const { vibehiveUser } = useContext(ContextAPI);

  return (
    <div className="messenger  w-4/5  text-white mt-[12vh] h-max">
      <div className="w-full  py-2  ">
        <ChatList vibehiveUser={vibehiveUser} />
      </div>
    </div>
  );
}
