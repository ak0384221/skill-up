import { Outlet } from "react-router-dom";
import NotLoggedIn from "../Errors/NotLoggedIn";

export default function ProtectedRoutes() {
  const loggedIn = true;

  return <>{loggedIn ? <Outlet /> : <NotLoggedIn />}</>;
}
