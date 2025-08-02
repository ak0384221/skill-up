import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import PageLoader from "../components/shared/pageLoader";
import Login from "../components/Pages/Login";

export default function ProtectedRoutes() {
  const { authData } = useContext(AuthContext);
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

  if (authData?.currentUser) {
    return <Outlet />;
  } else {
    return <Login />;
  }
}
