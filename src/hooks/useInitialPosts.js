import { useEffect, useState } from "react";
import { query, orderBy, onSnapshot } from "firebase/firestore";

function usePosts(postDataRef, currentUser) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const postsQuery = query(postDataRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const postsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching posts:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, postDataRef]);

  return { posts, loading, error };
}

export default usePosts;
