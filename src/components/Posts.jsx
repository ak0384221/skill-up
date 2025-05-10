import { useContext } from "react";
import SinglePostCard from "./PostDesign/CompleteSinglePostItem";
import { AuthContext } from "../Context/AuthContext";
import { FetchingContext } from "../Context/FetchingContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../shared/loader";

export default function Posts() {
  const { authorized } = useContext(AuthContext);
  const { postList, fetchMorePosts, hasMore } = useContext(FetchingContext);
  console.log(authorized);
  return (
    <>
      <div className="postsList w-full md:w-1/2   ">
        <InfiniteScroll
          dataLength={postList.length} //This is important field to render the next data
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <div className="h-16 w-full bg-blue-500 p-1">
              <Loader />
            </div>
          }
          endMessage={
            <p className="text-2xl text-center text-purple-600 font-Fugaz font-light">
              Yay! You have seen it all
            </p>
          }
        >
          {postList.map((post) => {
            return <SinglePostCard key={post.id} post={post} />;
          })}
        </InfiniteScroll>
      </div>
    </>
  );
}
