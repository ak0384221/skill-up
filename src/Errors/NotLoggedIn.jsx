import { Link } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <div className=" flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          You are not logged in
        </h2>
        <p className="text-gray-600 mb-6">
          Please{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            go to the login page
          </Link>{" "}
          to access this content.
        </p>
      </div>
    </div>
  );
}
