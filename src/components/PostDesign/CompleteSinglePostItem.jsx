import BottomMostCard from "./BottomMostCard";
import MainPost from "./MainPost";
import TopMostInfoCard from "./TopMostInfoCart";

export default function SinglePostCard({ post }) {
  return (
    <div className="post w-full min-h-[50vh]  mx-auto rounded-xl flex flex-col justify-between overflow-hidden  bg-[#242526] my-4 ">
      <TopMostInfoCard post={post} />
      <MainPost post={post} />
      <BottomMostCard post={post} />
    </div>
  );
}
