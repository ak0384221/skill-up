import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
//external
import { useContext } from "react";
import SinglePostCard from "../PostDesign/CompleteSinglePostItem";
import { AuthContext } from "../../Context/AuthContext";
import { FetchingContext } from "../../Context/FetchingContext";
import Loader from "../shared/loader";
import "react-loading-skeleton/dist/skeleton.css";
//local

export default function Posts() {
  const { authorized } = useContext(AuthContext);
  const { postLists, fetchMorePosts, hasMore } = useContext(FetchingContext);
  console.log(authorized);
  console.log(postLists);
  return (
    <>
      <div className="postsList w-full md:w-1/2   ">
        <InfiniteScroll
          dataLength={postLists.length} //This is important field to render the next data
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <div className="h-screen w-full bg-transparent p-2  ">
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
              <Skeleton count={2} height="60vh" />
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
