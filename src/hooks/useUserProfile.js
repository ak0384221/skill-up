import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { postDataRef, userDataRef } from "../Config/firebase";
function useUserProfile(id) {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  // Fetch user info
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const ref = doc(userDataRef, id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUser(snap.data());
        } else {
          console.log("No user found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [id]);

  // Realtime fetch of posts
  useEffect(() => {
    if (!id) return;

    const q = query(
      postDataRef,
      where("uid", "==", id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserPosts(posts);
    });

    return () => unsubscribe();
  }, [id]);

  return { user, userPosts };
}

export default useUserProfile;
