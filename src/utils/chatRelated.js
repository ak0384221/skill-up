import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, msgDataRef } from "../Config/firebase";

async function sendMsgToServer(msgObj) {
  try {
    const convId = msgObj.convId;
    const messagesRef = collection(doc(msgDataRef, convId), "messages");

    const fullMsg = {
      ...msgObj,
      timestamp: serverTimestamp(),
    };

    await addDoc(messagesRef, fullMsg);
    console.log("Message sent!");
  } catch (err) {
    console.error("Failed to send message:", err);
  }
}
function listenMessagesRealtime(convId, callback) {
  const messagesRef = collection(doc(db, "messagesDB", convId), "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));

  // Listen to realtime updates
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });

  return unsubscribe; // caller can call this to stop listening
}

export { sendMsgToServer, listenMessagesRealtime };
