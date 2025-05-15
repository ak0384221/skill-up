import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { onSnapshot, query } from "firebase/firestore";
import { postDataRef } from "../firebase";
import { where, orderBy } from "firebase/firestore";
import SinglePostCard from "./PostDesign/CompleteSinglePostItem";
export default function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  const [myData, setMyData] = useState([]);

  console.log(currentUser);

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
        <div className="profile bg-[#f2fdff] p-3">
          <div className="w-1/3  mx-auto h-[25vh] flex justify-center items-center">
            <img className="h-35 w-35 border  rounded-full object-cover " />
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
        <h1 className="text-4xl  font-Fugaz bg-gradient-to-r from-purple-500 via-purple-500  to-pink-500 bg-clip-text text-transparent  w-max border  mx-auto my-[5vh]">
          Your Posts
        </h1>
        {myData.map((post) => {
          return <SinglePostCard post={post} />;
        })}
      </div>{" "}
    </>
  );
}
