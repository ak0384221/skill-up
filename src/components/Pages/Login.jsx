import { FcGoogle } from "react-icons/fc";
import { Form, Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
//built-in
import { AuthContext } from "../../Context/AuthContext";
import Button from "../shared/Button";
import { logInFormHandler, logInWithGoogle } from "../../utils/authRelated";
import Loader from "../shared/loader";
//local
export default function Login() {
  const { authData, setAuthData } = useContext(AuthContext);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  return (
    <div className="mt-[15vh] text-white  flex items-start justify-center  rounded-sm w-full   ">
      <div className=" w-[90%]  md:w-2/3 lg:w-3/5 xl:w-1/3 rounded-2xl  px-3  py-4 border-1 border-[#ce7ece57] ">
        <h2 className="text-3xl pt-4 font-bold text-center mb-6 ">Log In</h2>

        <Form
          method="post"
          action="#"
          onSubmit={(evt) => {
            evt.preventDefault();
            setAuthData((data) => {
              return { ...data, isLoading: true };
            });
            logInFormHandler(evt, emailRef, passRef, navigate);
          }}
          className="space-y-5  w-full mx-auto px-1  "
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              Email address
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none focus:outline-0 font-light"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium  mb-1"
            >
              Password
            </label>
            <input
              ref={passRef}
              id="password"
              type="password"
              className="w-full px-4 py-2 border-1  border-[#c7c7c7] rounded-sm font-light focus:outline-none focus:outline-0"
              placeholder="••••••••"
            />
          </div>
          {authData?.isError && (
            <div className="w-full border min-h-10 h-max border-red-300 font-bold text-red-500 text-sm px-2 py-1 rounded-sm">
              {authData?.isError}
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center ">
              <input type="checkbox" className="Form-checkbox mr-2" />
              Remember me
            </label>
            <a href="#" className=" hover:underline">
              Forgot password?
            </a>
          </div>
          <Button variant="light">
            {authData.isLoading ? <Loader /> : "Log in"}
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-[#ffffff]">
          Don’t have an account?
          <Link to="/signup" className=" hover:underline font-bold mx-2">
            Sign up
          </Link>
        </p>
        <div className=" flex  gap-2 justify-center my-2">
          <FcGoogle
            onClick={() => {
              setAuthData((data) => {
                return { ...data, isLoading: true };
              });
              logInWithGoogle(navigate, setAuthData);
            }}
            className="size-6 cursor-pointer hover:scale-115 transition-all "
          />
        </div>
      </div>
    </div>
  );
}
