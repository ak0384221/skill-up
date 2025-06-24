import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function MsgRender({ msg }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className={`message left flex my-3 w-full  rounded-md ${
        msg?.senderId === currentUser?.uid ? "justify-end" : "justify-start"
      }`}
    >
      <p className="bubble p-2 w-max bg-[#636262] rounded-md text-white">
        {msg?.textMsg}
      </p>
    </div>
  );
}
