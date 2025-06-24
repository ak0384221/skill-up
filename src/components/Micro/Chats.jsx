import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import useUserProfile from "../../hooks/useUserProfile";
import { IoSendSharp } from "react-icons/io5";

export default function Chats() {
  const [Messages, setMessages] = useState();
  const { currentUser } = useContext(AuthContext);
  const { sendMsgToServer, listenMessagesRealtime } = useContext(ChatContext);
  const { receiverId } = useParams(); // this will be user.id from the URL

  const { user, userPosts } = useUserProfile(receiverId);
  const navigate = useNavigate();
  let textMsgRef = useRef();
  const convId = [currentUser?.uid, receiverId].sort().join("_");

  function sendMsg() {
    if (textMsgRef.current.value != "") {
      const msgObj = {
        textMsg: textMsgRef.current.value,
        senderId: currentUser.uid,
        receiverId: receiverId,
        convId: convId,
      };
      sendMsgToServer(msgObj);
      textMsgRef.current.value = "";
    }
  }

  useEffect(() => {
    const unsubscribe = listenMessagesRealtime(convId, (msgs) => {
      setMessages(msgs);
      console.log(msgs);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [convId]);

  return (
    <>
      <>
        {/* Chat Area */}
        <main className="flex flex-col justify-between min-h-screen w-full boverflow-hidden  ">
          {/* Header */}
          <header className="  bg-[#2A2C2A]  w-full flex  gap-2 h-max py-3 backdrop-blur-2xl text-white font-bold items-center px-5 ">
            <img
              src={user?.profilePic?.[user.profilePic.length - 1]?.pictureUrl}
              alt="Chat User"
              className="size-8 rounded-full object-cover"
            />
            <h2 className="text-xl font-Inter">{user?.username}</h2>
          </header>

          {/* Messages */}
          <section className="w-full bg-[#1E201E] h-[75vh] overflow-y-scroll -green-500 ">
            <div className="w-full my-5 space-y-3 px-8 ">
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
              {Messages?.map((msg) => (
                <div
                  className={`flex ${
                    msg?.senderId === currentUser?.uid
                      ? "justify-end "
                      : "justify-start"
                  }   `}
                >
                  <div
                    className={` ${
                      msg?.senderId === currentUser?.uid
                        ? "bg-[#263d86] text-white "
                        : "bg-[#383838] text-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Input area */}
          <footer className="h-max py-4  bg-[#2A2C2A] px-4 w-full   flex items-center justify-center  gap-4 ">
            <IoArrowBack
              onClick={() => navigate(-1)}
              className="   text-2xl text-white bg-black rounded-full size-8 p-1 hover:bg-white hover:text-black  active:scale-105 transition-all"
            />
            <textarea
              required
              ref={textMsgRef}
              rows={2}
              className="resize-none rounded-xl border  border-gray-400 focus:outline-none w-3/4 md:w-1/2 py-2 px-4 text-white "
              placeholder="Type a message..."
            />

            <IoSendSharp
              className="text-3xl text-blue-500 cursor-pointer  active:scale-105 transition-all"
              onClick={sendMsg}
            />
          </footer>
        </main>
      </>
    </>
  );
}
