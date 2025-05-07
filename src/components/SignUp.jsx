import { Form, Link } from "react-router-dom";
import Button from "../shared/Button";

import { signUpFormHandler } from "../utils/helperFunctions";
import { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
export default function SignUpForm() {
  const { signUpAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const userNameRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  return (
    <div className="h-[70vh] mt-10 mv-3 flex items-center justify-center bg-gray-100  w-[90%] ">
      <Form
        method="post"
        action="#"
        onSubmit={(evt) =>
          signUpFormHandler(
            evt,
            userNameRef,
            emailRef,
            passRef,
            confirmPassRef,
            signUpAuth
          )
        }
        className="bg-white  rounded-xl  w-full px-3 border-1 py-6 border-[#90a8f7] space-y-3"
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
            className="border-1 border-[#c7c7c7] rounded-md px-2 py-2 focus:outline-none focus:ring-2  focus:ring-blue-400"
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
            className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border-1 border-[#c7c7c7] rounded-md px-2 py-2 focus:outline-none focus:ring-2  focus:ring-blue-400"
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
            className="border-1 border-[#c7c7c7] rounded-md px-2 py-2 focus:outline-none focus:ring-2  focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        <Button variant="blue" className="w-full h-10">
          Sign Up
        </Button>
        <p className="font-bold  text-sm text-center ">
          Already have an account?{" "}
          <Link className="text-purple-600" to="/login">
            log in
          </Link>
        </p>
      </Form>
    </div>
  );
}
