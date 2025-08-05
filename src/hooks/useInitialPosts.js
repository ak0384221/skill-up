import { useEffect } from "react";
import { query, orderBy, limit, onSnapshot } from "firebase/firestore";

function useInitialPosts({ authData, postDataRef, POSTS_LIMIT, dispatch }) {
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    let unsubscribe = () => {};

    if (authData.currentUser) {
      const postsQuery = query(
        postDataRef,
        orderBy("createdAt", "desc"),
        limit(POSTS_LIMIT)
      );

      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        const postslist = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        dispatch({
          type: "ADD_INITIAL_POSTS",
          payload: {
            posts: postslist,
            lastDoc: lastDoc,
            hasMore: postslist.length === POSTS_LIMIT,
          },
        });
      });
    } else {
      console.log("Not authorized...");
    }

    return () => unsubscribe();
  }, [authData.currentUser]);
}

export default useInitialPosts;
