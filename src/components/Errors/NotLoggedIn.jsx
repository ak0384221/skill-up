import { Link } from "react-router-dom";
//built-in
import Button from "../shared/Button";

export default function NotLoggedIn() {
  return (
    <div className="w-4/5 md:w-2/5 flex items-start justify-center px-4  h-screen">
      <div className=" w-full mt-[15vh]  rounded-sm shadow-lg py-12 px-10 text-center border border-[#ca5959] ">
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
          </Link>
        </div>
      </div>
    </div>
  );
}
