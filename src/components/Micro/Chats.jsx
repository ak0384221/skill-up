import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import useUserProfile from "../../hooks/useUserProfile";

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
        <main className="flex flex-col  w-full  mt-[12vh]  relative">
          {/* Header */}
          <header className="fixed h-[7vh]  left-0 px-5 w-full flex  gap-4 mb-5  backdrop-blur-2xl text-white font-bold items-center mx-2">
            <img
              src={user?.profilePic?.[user.profilePic.length - 1]?.pictureUrl}
              alt="Chat User"
              className="size-8 rounded-full object-cover"
            />
            <h2>{user?.username}</h2>
          </header>

          {/* Messages */}
          <section className="min-h-[70vh] px-5 mt-[8vh]  ">
            {/* Received message */}
            <div className="h-max w-full space-y-3  ">
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
                        ? "bg-blue-500 text-white "
                        : "bg-white"
                    } p-3 rounded-xl max-w-xs  text-gray-800`}
                  >
                    {msg.textMsg}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Input area */}
          <footer className="p-4 w-full  py-5 flex items-center justify-center gap-3 fixed bottom-0 z-999 overflow-hidden bg-[#131212]">
            <IoArrowBack
              onClick={() => navigate(-1)}
              className="   text-2xl text-white bg-black rounded-full size-8 p-1 hover:bg-white hover:text-black transition-colors"
            />
            <textarea
              required
              ref={textMsgRef}
              rows={1}
              className="resize-none rounded-xl border  border-gray-600 p-2 focus:outline-none w-3/4 md:w-1/2 text-white"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMsg}
              className="bg-blue-600 w-20 h-10 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Send
            </button>
          </footer>
        </main>
      </>
    </>
  );
}
