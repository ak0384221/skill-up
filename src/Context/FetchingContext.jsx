import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
//built-in
import { AuthContext } from "./AuthContext";
import { postDataRef } from "../Config/firebase";
import { query, orderBy, onSnapshot, limit } from "firebase/firestore";
import {
  postsInitialState,
  postsContentReducerMethod,
} from "../Reducers/PostCRUD";

//important import statement------

export const FetchingContext = createContext([]);
export default function FetchingContextProvider({ children }) {
  const [postContents, dispatchPostsContent] = useReducer(
    postsContentReducerMethod,
    postsInitialState
  );
  const { postLists, crudError } = postContents;
  let { hasMore, lastDoc, postLoading } = postContents;
  const { authData } = useContext(AuthContext);
  const POSTS_LIMIT = 10;
  //-------

  //Fetching posts initially from fireStore
  useEffect(() => {
    let unsubscribe = () => {};
    if (authData.currentUser) {
      dispatchPostsContent({
        type: "SET_LOADING",
        payload: { postLoading: true },
      });
      const postsQuery = query(
        postDataRef,
        orderBy("createdAt", "desc"),
        limit(POSTS_LIMIT)
      );
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        const postslist = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        console.log(postLists);
        addInitialPosts(
          postslist,
          lastVisible,
          snapshot.docs.length === POSTS_LIMIT
        );
        dispatchPostsContent({
          type: "SET_LOADING",
          payload: { postLoading: false },
        });
      });
    } else {
      console.log("Not authorized....");
    }
    return () => unsubscribe();
  }, [authData.currentUser]);

  function addInitialPosts(postLists, lastDoc, hasMore) {
    const initialItems = {
      type: "ADD_INITIAL_POSTS",
      payload: {
        postLists,
        lastDoc,
        hasMore,
      },
    };
    dispatchPostsContent(initialItems);
  }

  return (
    <FetchingContext.Provider
      value={{
        postLists,
        hasMore,
        crudError,
        postLoading,
        lastDoc,
        POSTS_LIMIT,
      }}
    >
      {children}
    </FetchingContext.Provider>
  );
}
