import { useContext, useRef } from "react";
import { Form, Link } from "react-router-dom";
//built-in
import Button from "../shared/Button";
import { signUpFormHandler } from "../../utils/helperFunctions";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../shared/loader";
//local
export default function SignUpForm() {
  const { signUpAuth, AuthLoading, setAuthLoading } = useContext(AuthContext);
  const emailRef = useRef();
  const userNameRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  return (
    <div className="  flex items-start justify-center min-h-screen rounded-sm w-full text-black     ">
      <Form
        method="post"
        action="#"
        onSubmit={(evt) => {
          setAuthLoading(true);
          signUpFormHandler(
            evt,
            userNameRef,
            emailRef,
            passRef,
            confirmPassRef,
            signUpAuth
          );
        }}
        className="w-[90%] md:w-2/3 lg:w-3/5 xl:w-1/3 bg-white rounded-lg mt-[10vh] p-6 border-1 border-[#ce7ece]"
      >
        <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-[#0729e9] via-[#a576e2]  to-[#d111d1] bg-clip-text text-transparent">
          Create Account
        </h2>

        <div className="flex flex-col">
          <label className="text-sm  bg-gradient-to-r from-blue-700  to-purple-700 bg-clip-text text-transparent  font-[500] mb-1">
            Username
          </label>
          <input
            type="text"
            ref={userNameRef}
            className="border-1 border-[#c7c7c7] rounded-md px-2 py-2 focus:outline-none focus:ring-2  focus:ring-blue-400 font-light "
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block  bg-gradient-to-r from-blue-700  to-purple-800 bg-clip-text text-transparent  font-[500] mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-light "
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm bg-gradient-to-r from-blue-700  to-purple-700 bg-clip-text text-transparent  font-[500] mb-1">
            Password
          </label>
          {/* 01911244297 */}
          <input
            ref={passRef}
            type="password"
            className="border-1 border-[#c7c7c7] rounded-md px-2 py-2 focus:outline-none focus:ring-2  focus:ring-blue-400 font-light  placeholder:font-bold"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm  bg-gradient-to-r from-blue-700  to-purple-700 bg-clip-text text-transparent  font-[500] mb-1">
            Confirm Password
          </label>
          <input
            ref={confirmPassRef}
            type="password"
            className="border-1 border-[#c7c7c7] rounded-md px-2 py-2 focus:outline-none focus:ring-2  focus:ring-blue-400 font-light  placeholder:font-bold"
            placeholder="••••••••"
          />
        </div>

        <Button variant="light" className="w-full h-10 mt-3">
          {AuthLoading ? <Loader /> : "Sign up"}
        </Button>
        <p className="font-medium my-2 text-sm text-center text-[#2a48ac] ">
          Already have an account?{" "}
          <Link className="text-purple-600" to="/login">
            log in
          </Link>
        </p>
      </Form>
    </div>
  );
}
