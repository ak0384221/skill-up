import { Navigate, Outlet } from "react-router-dom";
import NotLoggedIn from "../Errors/NotLoggedIn";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../shared/loader";
import PostLoader from "../shared/postLoader";

export default function ProtectedRoutes() {
  const { authorized } = useContext(AuthContext);

  if (authorized === null) {
    return (
      <div className="w-[20vw] h-[20vh] p-4 my-[20vh] mx-auto">
        <PostLoader />
      </div>
    );
  }

  if (authorized === true) {
    return <Outlet />;
  }

  return <NotLoggedIn />;
}
