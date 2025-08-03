import { Form, Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//built-in
import { AuthContext } from "../../Context/AuthContext";
import Button from "../shared/Button";
import { logInAuthHandler } from "../../utils/authRelated";
import Loader from "../shared/loader";
import { FaEye } from "react-icons/fa";
import { loginSchema } from "../../Schemas/login";
//local
export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [loginErr, setLoginErr] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  return (
    <div className="mt-[15vh] text-white  flex items-start justify-center  rounded-sm w-full   ">
      <div className=" w-[90%]  md:w-2/3 lg:w-3/5 xl:w-1/3 rounded-2xl  px-3  py-4 border-1 border-[#ce7ece57] ">
        <h2 className="text-3xl pt-4 font-bold text-center mb-6 ">Log In</h2>

        <Form
          onSubmit={handleSubmit((data) =>
            logInAuthHandler(data, navigate, setAuthData, setLoginErr)
          )}
          className="space-y-5  w-full mx-auto px-1  "
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              Email address
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none focus:outline-0 font-light"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-2 ">
            <label className="text-smfont-[500] mb-1">Password</label>

            <div className=" w-full  flex items-center relative">
              <input
                {...register("password")}
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
            {errors?.password && (
              <p className="text-red-800 font-light ">
                {errors?.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center ">
              <input type="checkbox" className="Form-checkbox mr-2" />
              Remember me
            </label>
            <a href="#" className=" hover:underline">
              Forgot password?
            </a>
          </div>
          {loginErr && (
            <div className="w-full mt-3 border min-h-10 h-max border-red-300 font-bold text-red-800  text-sm px-2 py-1 rounded-sm">
              {loginErr?.message}
            </div>
          )}
          <Button variant="light" className="w-full h-10 mt-3">
            {authData?.isLoading ? <Loader /> : "Login"}
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-[#ffffff]">
          Don’t have an account?
          <Link to="/signup" className=" hover:underline font-bold mx-2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
