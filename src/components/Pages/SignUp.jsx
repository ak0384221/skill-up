import { useContext, useRef } from "react";
import { Form, Link } from "react-router-dom";
//built-in
import Button from "../shared/Button";
import { signUpFormHandler } from "../../utils/helperFunctions";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../shared/loader";
//local
export default function SignUpForm() {
  const { signUpAuth, authLoading, passLoadingDispatch, authError } =
    useContext(AuthContext);
  const emailRef = useRef();
  const userNameRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  return (
    <div className=" mt-[10vh] flex items-start justify-center min-h-screen rounded-sm w-full text-white     ">
      <Form
        method="post"
        action="#"
        onSubmit={(evt) => {
          passLoadingDispatch(true);
          signUpFormHandler(
            evt,
            userNameRef,
            emailRef,
            passRef,
            confirmPassRef,
            signUpAuth
          );
        }}
        className="w-[90%] md:w-2/3 lg:w-3/5 xl:w-1/3  rounded-lg mt-[10vh] p-6 border-1 border-[#ce7ece73]"
      >
        <h2 className="text-3xl font-semibold text-center mb-5 ">
          Create Account
        </h2>

        <div className="flex flex-col mb-2">
          <label className="text-sm font-[500] mb-1">Username</label>
          <input
            type="text"
            ref={userNameRef}
            className="border-1 border-[#c7c7c7]  rounded-md px-2 py-2 focus:outline-none   font-light "
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="block  font-[500] mb-1">
            Email address
          </label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none font-light "
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="text-smfont-[500] mb-1">Password</label>
          {/* 01911244297 */}
          <input
            ref={passRef}
            type="password"
            className="border-1 border-[#c7c7c7]  rounded-md px-2 py-2 focus:outline-none   font-light  placeholder:font-bold"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="text-sm font-[500] mb-1">Confirm Password</label>
          <input
            ref={confirmPassRef}
            type="password"
            className="border-1 border-[#c7c7c7]  rounded-md px-2 py-2 focus:outline-none   font-light  placeholder:font-bold"
            placeholder="••••••••"
          />
        </div>
        {authError && (
          <div className="w-full mt-3 border min-h-10 h-max border-red-300 font-bold text-red-500 text-sm px-2 py-1 rounded-sm">
            {authError.message}
          </div>
        )}

        <Button variant="light" className="w-full h-10 mt-3">
          {authLoading ? <Loader /> : "Sign up"}
        </Button>
        <p className="font-medium my-2 text-sm text-center  ">
          Already have an account ?
          <Link className=" hover:border-b mx-3" to="/login">
            log in
          </Link>
        </p>
      </Form>
    </div>
  );
}
