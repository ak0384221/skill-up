import { useContext, useRef, useState } from "react";
import VibeHivesUserCard from "../Micro/vibehivesUserCard";
import { ChatContext } from "../../Context/ChatContext";
import Button from "../shared/Button";
import { Form } from "react-router-dom";
import ChatList from "../Micro/chatlist";
import Chats from "../Micro/Chats";
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
