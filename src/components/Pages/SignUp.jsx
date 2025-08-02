import { useContext, useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
//built-in
import { FaEye } from "react-icons/fa";

import Button from "../shared/Button";
import { signUpFormHandler } from "../../utils/authRelated";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../shared/loader";
//local
export default function SignUpForm() {
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef();
  const userNameRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const [showPass, setShowPass] = useState(false);
  const [confirmShowPass, SetconfirmShowPass] = useState(false);

  return (
    <div className=" mt-[15vh] flex items-start justify-center  rounded-sm w-full text-white     ">
      <Form
        method="post"
        action="#"
        onSubmit={(evt) => {
          evt.preventDefault();
          console.log(evt);
          setAuthData((data) => {
            return { ...data, isLoading: true };
          });
          signUpFormHandler(
            evt,
            userNameRef,
            emailRef,
            passRef,
            confirmPassRef,

            navigate
          );
        }}
        className="w-[90%] md:w-2/3 lg:w-3/5 xl:w-1/3  rounded-lg  p-6 border-1 border-[#ce7ece73]"
      >
        <h2 className="text-3xl font-semibold text-center mb-5 ">
          Create Account
        </h2>

        <div className="flex flex-col mb-2">
          <label className="text-sm font-[500] mb-1">Username</label>
          <input
            type="text"
            min={4}
            max={20}
            required
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
            required
            ref={emailRef}
            type="email"
            className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none font-light "
          />
        </div>

        <div className="flex flex-col mb-2 ">
          <label className="text-smfont-[500] mb-1">Password</label>

          <div className=" w-full  flex items-center relative">
            <input
              ref={passRef}
              type={showPass ? "text" : "password"}
              className="border-1 w-full border-[#c7c7c7]  rounded-md px-2 py-2 focus:outline-none   font-light  placeholder:font-bold"
              placeholder="••••••••"
            />
            <FaEye
              onClick={() => {
                setShowPass(!showPass);
              }}
              className="absolute right-0 text-xl mx-2"
            />
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <label className="text-sm font-[500] mb-1">Confirm Password</label>
          <div className=" w-full  flex items-center relative">
            <input
              ref={confirmPassRef}
              type={confirmShowPass ? "text" : "password"}
              className="border-1 w-full border-[#c7c7c7]  rounded-md px-2 py-2 focus:outline-none   font-light  placeholder:font-bold"
              placeholder="••••••••"
            />
            <FaEye
              onClick={() => {
                SetconfirmShowPass(!confirmShowPass);
              }}
              className="absolute right-0 text-xl mx-2"
            />
          </div>
        </div>
        {authData?.isError && (
          <div className="w-full mt-3 border min-h-10 h-max border-red-300 font-bold text-red-500 text-sm px-2 py-1 rounded-sm">
            {authData?.isError}
          </div>
        )}

        <Button variant="light" className="w-full h-10 mt-3">
          {authData?.isLoading ? <Loader /> : "Sign up"}
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
