import { Navigate, Outlet } from "react-router-dom";
import NotLoggedIn from "../components/Errors/NotLoggedIn";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../components/shared/loader";
export default function ProtectedRoutes() {
  const { authorized } = useContext(AuthContext);

  if (authorized === null) {
    return (
      <div className="w-[20vw] h-[20vh] p-4 my-[20vh] mx-auto">
        <Loader />
      </div>
    );
  }

  if (authorized === true) {
    return <Outlet />;
  }

  return <NotLoggedIn />;
}
