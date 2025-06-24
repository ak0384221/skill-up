import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NotLoggedIn from "../components/Errors/NotLoggedIn";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../components/shared/loader";
import PageLoader from "../components/shared/pageLoader";
import Login from "../components/Pages/Login";

export default function ProtectedRoutes() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup
  }, []);

  if (loading) {
    return (
      <div className="size-[10rem] mx-auto mt-[15vh] flex justify-center items-center  rounded-full p-1">
        <PageLoader />
      </div>
    );
  }

  if (currentUser) {
    return <Outlet />;
  } else {
    return <Login />;
  }
}
