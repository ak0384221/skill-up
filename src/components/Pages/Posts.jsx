import SinglePostCard from "../PostDesign/CompleteSinglePostItem";
import PostSkeleton from "../PostSkeleton/postSkeleton";
import { useContext } from "react";
import { postDataRef } from "../../Config/firebase";
import { ContextAPI } from "../../Context/ContextAPI";
import usePosts from "../../hooks/useInitialPosts";

export default function Posts() {
  const { authData } = useContext(ContextAPI);
  const { posts, loading, error } = usePosts(postDataRef, authData.currentUser);

  return (
    <div className="posts w-full mt-[12vh]  mx-auto  md:w-1/2">
      {posts?.map((post) => {
        return <SinglePostCard key={post.id} post={post} />;
      })}

      {loading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      {error && <h1>error</h1>}
    </div>
  );
}
