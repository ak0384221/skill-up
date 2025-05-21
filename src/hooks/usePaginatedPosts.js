import { query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";

function usePaginatedPosts({
  lastDoc,
  POSTS_LIMIT,
  postDataRef,
  dispatchPostsContent,
}) {
  async function fetchMorePosts() {
    if (!lastDoc) return;

    const nextQuery = query(
      postDataRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(POSTS_LIMIT)
    );

    const snapshot = await getDocs(nextQuery);

    if (snapshot.empty) {
      dispatchPostsContent({
        type: "SET_HAS_MORE",
        payload: { hasMore: false },
      });
      return;
    }

    const newPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
    const hasMore = newPosts.length === POSTS_LIMIT;

    addMorePostsToState(newPosts, newLastDoc, hasMore);
  }

  function addMorePostsToState(newPosts, lastDoc, hasMore) {
    dispatchPostsContent({
      type: "FETCH_MORE_ITEM",
      payload: {
        newPosts,
        lastDoc,
        hasMore,
      },
    });
  }

  return { fetchMorePosts };
}

export default usePaginatedPosts;
