import { use, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoCloseCircleSharp } from "react-icons/io5";
import useUserProfile from "../../hooks/useUserProfile";
import { IoSendSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill, BsFillImageFill } from "react-icons/bs";
import { uploadFilesViaSupabase } from "../../utils/helperFunctions";
import { img } from "framer-motion/client";

export default function Chats() {
  const [Messages, setMessages] = useState();
  const [text, setText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [rows, setRows] = useState(1);
  const [showPicker, setShowPicker] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { sendMsgToServer, listenMessagesRealtime } = useContext(ChatContext);
  const { receiverId } = useParams(); // this will be user.id from the URL
  const bottomRef = useRef();
  const { user, userPosts } = useUserProfile(receiverId);
  const navigate = useNavigate();
  let textMsgRef = useRef();
  const convId = [currentUser?.uid, receiverId].sort().join("_");

  async function sendMsg(e) {
    setShowPicker(false);
    if (!selectedMedia && !text) {
      return "empty";
    }

    if (selectedMedia) {
      setSelectedMedia(null);
      setImgPreview(null);
      const imgUrl = await uploadFilesViaSupabase(selectedMedia);
      console.log(imgUrl);
      const imageObj = {
        imgUrl: imgUrl,
        senderId: currentUser.uid,
        receiverId: receiverId,
        convId: convId,
      };
      await sendMsgToServer(imageObj);
      const msgObj = {
        textMsg: text,
        senderId: currentUser.uid,
        receiverId: receiverId,
        convId: convId,
      };
      sendMsgToServer(msgObj);
      setText("");
    } else {
      const msgObj = {
        textMsg: text,
        senderId: currentUser.uid,
        receiverId: receiverId,
        convId: convId,
      };

      sendMsgToServer(msgObj);
      setText("");
    }
  }
  function handleImageUpload(evt) {
    evt.preventDefault();
    setSelectedMedia(evt.target.files[0]);
    const preview = URL.createObjectURL(evt.target.files[0]);
    setImgPreview(preview);
  }

  useEffect(() => {
    const unsubscribe = listenMessagesRealtime(convId, (msgs) => {
      setMessages(msgs);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [convId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [Messages]);

  return (
    <>
      <>
        {/* Chat Area */}
        <main className="flex flex-col justify-between min-h-[90vh] w-full overflow-y-hidden   ">
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
          <section
            className={`w-full ${
              rows > 1 ? "h-[70vh]" : "h-[75vh]"
            } bg-[#1c1d1c]`}
          >
            <div className="flex flex-col   h-full overflow-y-auto   px-4 py-2">
              <div className=" mt-auto  space-y-3">
                {Messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg?.senderId === currentUser?.uid
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {msg?.textMsg && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ease: "easeInOut", duration: 0.2 }}
                        className={`${
                          msg?.senderId === currentUser?.uid
                            ? "bg-[#263d86] text-white"
                            : "bg-[#383838] text-white"
                        } p-3 rounded-xl max-w-xs`}
                      >
                        {msg.textMsg}
                      </motion.div>
                    )}
                    {msg?.imgUrl && (
                      <img
                        src={msg?.imgUrl?.url}
                        className="w-[60vw] h-auto md:w-[60vw] md:h-auto object-cover lg:w-[40vw]"
                      />
                    )}
                  </div>
                ))}
                <div ref={bottomRef}></div>
              </div>
            </div>
          </section>
          {selectedMedia && (
            <div className="imagePreview  px-5">
              <div className="image size-20 relative">
                <IoCloseCircleSharp
                  onClick={() => {
                    setSelectedMedia(false);
                    setPreview(false);
                  }}
                  className="absolute top-0 -right-7 text-3xl text-white"
                />

                <img
                  src={imgPreview}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
          )}

          {/* Input area */}
          <footer className="h-max py-2 pt-3   px-4 w-full   flex items-center justify-center  gap-4 relative ">
            {showPicker && (
              <div className="emojis w-4/5   absolute -top-[70vh] h-[70vh] flex justify-center items-center">
                <EmojiPicker
                  onEmojiClick={(data, evt) => {
                    const newText = text + data.emoji;
                    setText(newText);
                  }}
                />
              </div>
            )}

            <IoArrowBack
              onClick={() => navigate(-1)}
              className="   text-2xl text-white bg-black rounded-full size-8 p-1 hover:bg-white hover:text-black  active:scale-85 transition-all"
            />
            <textarea
              onFocus={() => setRows(3)}
              onBlur={() => setRows(1)}
              required
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setShowPicker(false);
              }}
              rows={rows}
              className="resize-none rounded-3xl border  border-gray-400 focus:outline-none w-3/4 md:w-1/2 py-3 px-4 text-white "
              placeholder="Type a message..."
            />
            <input
              type="file"
              id="sendMedia"
              className="border hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="sendMedia">
              <BsFillImageFill className="size-8 cursor-pointer text-white" />
            </label>
            <BsEmojiSmileFill
              onClick={() => setShowPicker(!showPicker)}
              className="size-8 cursor-pointer text-[yellow]"
            />

            <IoSendSharp
              onMouseDown={(e) => e.preventDefault()}
              className="text-3xl text-blue-500 cursor-pointer  active:scale-85 transition-all"
              onClick={sendMsg}
            />
          </footer>
        </main>
      </>
    </>
  );
}
