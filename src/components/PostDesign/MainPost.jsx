export default function MainPost({ post }) {
  return (
    <>
      <div className="post w-full  h-max px-3 pb-3 text-gray-300 font-[400]">
        <p>{post.title}</p>
      </div>

      <div className="pic w-full  min-h-max h-[80vh] max-h-screen">
        <img
          className="w-full h-full object-cover"
          src={`${post.pictureURL}`}
          alt=""
        />
      </div>
    </>
  );
}
