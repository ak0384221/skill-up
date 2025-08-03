import { useContext, useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
//built-in
import { FaEye } from "react-icons/fa";
import Button from "../shared/Button";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../shared/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAuthHandler } from "../../utils/authRelated";
import { signupSchema } from "../../Schemas/signup";
//local
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });
  const { authData, setAuthData } = useContext(AuthContext);
  const [signupErr, setSignupErr] = useState(null);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [confirmShowPass, SetconfirmShowPass] = useState(false);

  return (
    <div className=" mt-[15vh] flex items-start justify-center  rounded-sm w-full text-white     ">
      <Form
        onSubmit={handleSubmit((data) =>
          signUpAuthHandler(data, navigate, setSignupErr)
        )}
        className="w-[90%] md:w-2/3 lg:w-3/5 xl:w-1/3  rounded-lg  p-6 border-1 border-[#ce7ece73]"
      >
        <h2 className="text-3xl font-semibold text-center mb-5 ">
          Create Account
        </h2>

        <div className="flex flex-col mb-2">
          <label className="text-sm font-[500] mb-1">Full name</label>
          <input
            {...register("fullName")}
            type="text"
            className="border-1 border-[#c7c7c7]  rounded-md px-2 py-2 focus:outline-none   font-light "
          />
          {errors?.fullName && (
            <p className="text-red-800 font-light ">
              {errors?.fullName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="block  font-[500] mb-1">
            Email address
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="w-full px-2 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none font-light "
          />
          {errors?.email && (
            <p className="text-red-800 font-light ">{errors?.email.message}</p>
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
              {errors?.password?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label className="text-sm font-[500] mb-1">Confirm Password</label>
          <div className=" w-full  flex items-center relative">
            <input
              {...register("confirmPassword")}
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
          {errors?.confirmPassword && (
            <p className="text-red-800 font-light ">
              {errors?.confirmPassword.message}
            </p>
          )}
        </div>
        {signupErr && (
          <div className="w-full mt-3 border min-h-10 h-max border-red-300 font-bold text-red-800  text-sm px-2 py-1 rounded-sm">
            {signupErr?.message}
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
