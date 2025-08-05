import { query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";

function usePaginatedPosts({ lastDoc, POSTS_LIMIT, postDataRef, dispatch }) {
  async function fetchMorePosts() {
    if (!lastDoc) return;
    const nextQuery = query(
      postDataRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(POSTS_LIMIT)
    );

    const snapshot = await getDocs(nextQuery);
    console.log("snapshot");

    if (!snapshot.empty) {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
      const hasMore = newPosts.length === POSTS_LIMIT;

      dispatch({
        type: "FETCH_MORE_ITEM",
        payload: {
          posts: newPosts,
          lastDoc: newLastDoc,
          hasMore: hasMore,
        },
      });
    }
  }

  return { fetchMorePosts };
}

export default usePaginatedPosts;
