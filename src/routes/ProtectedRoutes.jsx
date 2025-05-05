import { Outlet } from "react-router-dom";
import NotLoggedIn from "../Errors/NotLoggedIn";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoutes() {
  const { authorized } = useContext(AuthContext);

  return <>{authorized ? <Outlet /> : <NotLoggedIn />}</>;
}
