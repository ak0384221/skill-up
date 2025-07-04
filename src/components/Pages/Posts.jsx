import InfiniteScroll from "react-infinite-scroll-component";
//external
import usePaginatedPosts from "../../hooks/usePaginatedPosts";
import { useContext } from "react";
import SinglePostCard from "../PostDesign/CompleteSinglePostItem";
import { FetchingContext } from "../../Context/FetchingContext";
import Loader from "../shared/loader";
import "react-loading-skeleton/dist/skeleton.css";
import PostSkeleton from "../PostSkeleton/postSkeleton";
//local

export default function Posts() {
  console.log("post page");
  const {
    postLists,
    hasMore,
    lastDoc,
    POSTS_LIMIT,
    postDataRef,
    dispatchPostsContent,
  } = useContext(FetchingContext);
  const { fetchMorePosts } = usePaginatedPosts({
    lastDoc,
    POSTS_LIMIT,
    postDataRef,
    dispatchPostsContent,
  });

  return (
    <>
      <div className="postsList w-full md:w-1/2 mt-[12vh] min-h-screen ">
        <InfiniteScroll
          style={{ overflow: "hidden" }} // 👈 hides scrollbars
          dataLength={postLists.length} //This is important field to render the next data
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <div className="h-20 flex justify-center items-center">
              <Loader />
            </div>
          }
          endMessage={
            <p className="text-2xl text-center text-purple-600 font-Fugaz font-light">
              Yay! You have seen it all
            </p>
          }
        >
          {postLists.length === 0 && (
            <div className="">
              <PostSkeleton />
            </div>
          )}

          {postLists.map((post) => {
            return <SinglePostCard key={post.id} post={post} />;
          })}
        </InfiniteScroll>
      </div>
    </>
  );
}
