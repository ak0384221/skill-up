import { useParams } from "react-router-dom";
import PageLoader from "../shared/pageLoader";
import { VscEdit } from "react-icons/vsc";
import ProfileInfo from "../profileInfo";
import SinglePostCard from "../PostDesign/CompleteSinglePostItem";
import useUserProfile from "../../hooks/useUserProfile";

export default function User() {
  const { id } = useParams();
  const { user, userPosts } = useUserProfile(id);

  return (
    <div className="w-full min-h-screen h-max">
      {user ? (
        <div className="w-full ">
          <div className="cover dp w-full md:w-4/5 lg:w-3/5 h-[40vh] md:h-[40vh] lg:h-[50vh] border mx-auto relative">
            <img
              className="w-full h-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1685736630644-488e8146a3dc?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />

            <div className="size-40 absolute -bottom-10 left-1/2 transform -translate-x-1/2">
              <img
                src="https://images.unsplash.com/photo-1743071441939-9ec2b3352b54?q=80&w=389&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>

          <h2 className="font-Inter  text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 bg-clip-text text-transparent  border-black w-max  p-2 mt-10 mx-auto ">
            {user.username}
          </h2>
          <div className="w-3/5 mx-auto">
            <p className="mx-auto  text-center ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Possimus, impedit Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Incidunt, illo?
            </p>
            <VscEdit className="float-end border text-[2.25rem] p-2 rounded-full   bg-blue-500 text-white " />
          </div>

          <div className="left w-4/5  mx-auto my-[10vh] ">
            <ProfileInfo />
          </div>
          {
            <div className="w-2/5 mx-auto   ">
              {userPosts.map((post) => {
                return <SinglePostCard post={post} key={post.id} />;
              })}
            </div>
          }
        </div>
      ) : (
        <div className="size-[10rem] mx-auto mt-10 ">
          <PageLoader />
        </div>
      )}
    </div>
  );
}
