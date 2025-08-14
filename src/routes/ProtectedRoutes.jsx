import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "../components/shared/pageLoader";
import Login from "../components/Pages/Login";
import { ContextAPI } from "../Context/ContextAPI";

export default function ProtectedRoutes() {
  const [loading, setLoading] = useState(true);
  const { authData } = useContext(ContextAPI);

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
