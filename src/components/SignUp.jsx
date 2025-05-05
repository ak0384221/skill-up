import { Form } from "react-router-dom";
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
    <div className="h-[70vh] my-7 flex items-center justify-center bg-gray-100  w-4/5">
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
        className="bg-white  rounded-xl shadow-md w-full px-8 border-1 py-6 border-[#c7c5c5] space-y-3"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            ref={userNameRef}
            className="border-1 border-[#c7c7c7] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="yourusername"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#292929] mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          {/* 01911244297 */}
          <input
            ref={passRef}
            type="password"
            className="border-1 border-[#c7c7c7] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            ref={confirmPassRef}
            type="password"
            className="border-1 border-[#c7c7c7] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        <Button variant="blue" className="w-full h-10">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
