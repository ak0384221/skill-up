import { Navigate, Outlet } from "react-router-dom";
import NotLoggedIn from "../Errors/NotLoggedIn";

export default function ProtectedRoutes() {
  const loggedIn = false;

  return <>{loggedIn ? <Outlet /> : <NotLoggedIn />}</>;
}
