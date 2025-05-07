import { useContext } from "react";
import SinglePostCard from "./PostDesign/CompleteSinglePostItem";
import { AuthContext } from "../Context/AuthContext";
import { FetchingContext } from "../Context/FetchingContext";

export default function Posts() {
  const { authorized } = useContext(AuthContext);
  const { postList } = useContext(FetchingContext);
  console.log(authorized);
  return (
    <>
      {postList.length !== 0 && (
        <div className="postsList w-[90%] md:w-1/2   ">
          {postList.map((post) => {
            return <SinglePostCard key={post.id} post={post} />;
          })}
        </div>
      )}
    </>
  );
}
