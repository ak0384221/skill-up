import { Link } from "react-router-dom";
import Button from "../shared/Button";

export default function NotLoggedIn() {
  return (
    <div className=" flex items-center justify-center px-4  h-[70vh]">
      <div className=" w-full  rounded-sm shadow-lg py-12 px-10 text-center border border-[#cecccc] ">
        <h2 className="text-3xl font-semibold text-[#e92828] font-Inter mb-4">
          Access Denied
        </h2>
        <div className="w-4/5  mx-auto">
          <Link to="/login">
            <Button className="mb-1.5" variant="light">
              Login
            </Button>
          </Link>
          <Link to="/">
            <Button className="mb-1.5" variant="light">
              Demo login
            </Button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
