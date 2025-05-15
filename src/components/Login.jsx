import Button from "../shared/Button";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { AiFillGithub } from "react-icons/ai";
import { Form, Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { logInFormHandler } from "../utils/helperFunctions";
import Loader from "../shared/loader";

export default function Login() {
  const { logInAuth, logInWithGoogle, AuthLoading, setAuthLoading } =
    useContext(AuthContext);
  const emailRef = useRef();
  const passRef = useRef();
  return (
    <div className=" flex items-center justify-center h-[90vh] rounded-sm w-full   ">
      <div className=" w-[95%] md:w-2/3 lg:w-3/5 xl:w-1/3 bg-white rounded-2xl  px-3  py-4 border-1 border-[#ce7ece] ">
        <h2 className="text-3xl text-center bg-gradient-to-r from-purple-500 via-purple-500  to-pink-500 bg-clip-text text-transparent mb-6">
          Log In
        </h2>

        <Form
          method="post"
          action="#"
          onSubmit={(evt) => {
            logInFormHandler(evt, emailRef, passRef, logInAuth);
          }}
          className="space-y-5  w-full mx-auto px-1 "
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#a71ec9] mb-1"
            >
              Email address
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-light"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#a71ec9] mb-1"
            >
              Password
            </label>
            <input
              ref={passRef}
              id="password"
              type="password"
              className="w-full px-4 py-2 border-1  border-[#c7c7c7] rounded-sm font-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-[#a71ec9]">
              <input type="checkbox" className="Form-checkbox mr-2" />
              Remember me
            </label>
            <a href="#" className="text-[#a71ec9] hover:underline">
              Forgot password?
            </a>
          </div>
          <Button variant="light">{AuthLoading ? <Loader /> : "Log in"}</Button>
        </Form>

        <p className="mt-6 text-center text-sm text-[#303030]">
          Don’t have an account?
          <Link
            to="/signup"
            className="text-[#a71ec9] hover:underline font-bold mx-2"
          >
            Sign up
          </Link>
        </p>
        <div className=" flex  gap-2 justify-center my-2">
          <FcGoogle
            onClick={() => {
              setAuthLoading(true);
              logInWithGoogle();
            }}
            className="size-6 cursor-pointer hover:scale-115 transition-all "
          />
          <SiFacebook className="size-6 cursor-pointer hover:scale-115 transition-all " />
          <AiFillGithub className="size-6 cursor-pointer hover:scale-115 transition-all " />
        </div>
      </div>
    </div>
  );
}
