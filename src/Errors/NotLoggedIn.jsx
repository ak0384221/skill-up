import { Link } from "react-router-dom";
import Button from "../shared/Button";

export default function NotLoggedIn() {
  return (
    <div className=" flex items-center justify-center px-4  h-[70vh]">
      <div className=" w-full rounded-sm shadow-lg py-12 px-10 text-center border border-[#cecccc] ">
        <h2 className="text-3xl font-semibold text-[#313131] font-Inter mb-4">
          You are not logged in
        </h2>
        <p className="text-gray-600 mb-6">
          Go to
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            <Button variant="blue" className="px-4 py-2 mx-2">
              login page
            </Button>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
