import { useContext, useEffect, useState } from "react";
//built-in
import { onSnapshot, query } from "firebase/firestore";
import { where, orderBy } from "firebase/firestore";
//external
import { AuthContext } from "../../Context/AuthContext";
import { postDataRef } from "../../Config/firebase";
import SinglePostCard from "../PostDesign/CompleteSinglePostItem";
//local
export default function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  const [myData, setMyData] = useState([]);

  console.log(currentUser.photoURL);

  useEffect(() => {
    const q = query(
      postDataRef,
      where("username", "==", currentUser.displayName),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(posts);
      setMyData(posts);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="lg:w-[40vw]  min-h-screen w-full  rounded-sm    gap-4 ">
        <div className="profile p-3">
          <div className="w-1/3  mx-auto h-[25vh] flex justify-center items-cente">
            <img
              src={currentUser.photoURL}
              className="w-32 h-32 p-1.25  bg-[linear-gradient(to_right,_#feda75,_#fa7e1e,_#d62976,_#962fbf,_#4f5bd5)] object-cover rounded-full "
            />
          </div>
          <div className="w-full  my-4 space-y-2 p-2 ">
            <h2 className="font-Inter  text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 bg-clip-text text-transparent  border-black w-max ">
              {currentUser.displayName}
            </h2>
            <p className="text-sm ">Email: {currentUser.email}</p>
            <p className="text-sm ">
              Phone :{" "}
              {currentUser.phoneNumber ? currentUser.phoneNumber : "N/A"}
            </p>
            <p className="text-sm ">
              Email Verified : {currentUser.emailVerified ? "True" : "false"}
            </p>
          </div>
        </div>
        <h1 className="text-4xl  font-Fugaz text-gradient-purple w-max border  mx-auto my-[5vh]">
          Your Posts
        </h1>
        {myData.map((post) => {
          return <SinglePostCard post={post} />;
        })}
      </div>{" "}
    </>
  );
}
