import InfiniteScroll from "react-infinite-scroll-component";
import usePaginatedPosts from "../../hooks/usePaginatedPosts";
import SinglePostCard from "../PostDesign/CompleteSinglePostItem";
import PostSkeleton from "../PostSkeleton/postSkeleton";
import { useContext, useReducer } from "react";
import { postDataRef } from "../../Config/firebase";
import { AuthContext } from "../../Context/AuthContext";
import {
  postsContentReducerMethod,
  postsInitialState,
} from "../../Reducers/PostCRUD";
import useInitialPosts from "../../hooks/useInitialPosts";

export default function Posts() {
  const { authData } = useContext(AuthContext);
  const POSTS_LIMIT = 10;
  const [PostsData, dispatch] = useReducer(
    postsContentReducerMethod,
    postsInitialState
  );

  useInitialPosts({
    authData,
    postDataRef,
    POSTS_LIMIT,
    dispatch,
  });
  const { fetchMorePosts } = usePaginatedPosts({
    lastDoc: PostsData.lastDoc,
    POSTS_LIMIT,
    postDataRef,
    dispatch,
  });

  return (
    <div className="posts w-full mt-[12vh]  mx-auto  md:w-1/2">
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={PostsData?.posts?.length}
        next={fetchMorePosts}
        hasMore={PostsData?.hasMore}
        loader={<PostSkeleton />}
        endMessage={
          <p className="text-2xl text-[#696969] text-center font-Roboto font-medium my-10">
            No more post
          </p>
        }
      >
        {PostsData?.posts?.map((post) => {
          return (
            <SinglePostCard key={post.id} post={post} dispatch={dispatch} />
          );
        })}

        {PostsData?.isLoading && <PostSkeleton />}
      </InfiniteScroll>
    </div>
  );
}
