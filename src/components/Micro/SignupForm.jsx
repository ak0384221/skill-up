import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/authSchemas";
import { z } from "zod";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { signUpAuthHandler } from "../../utils/authRelated";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../shared/loader";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log("Signup:", data);
    setAuthData((data) => {
      return { ...data, isLoading: true, isError: null };
    });
    signUpAuthHandler(data, setAuthData, navigate);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="placeholder:text-xs placeholder:text-neutral-600  w-full mx-auto   text-white  py-3 space-y-1  rounded-lg "
    >
      {/* Name */}

      <div className="placeholder:text-xs placeholder:text-neutral-600 ">
        <div className="placeholder:text-xs placeholder:text-neutral-600  flex justify-between items-center ">
          <label htmlFor="name">Name</label>
          {errors.name && (
            <p className="placeholder:text-xs placeholder:text-neutral-600 text-red-800 text-xs">
              {errors.name.message}
            </p>
          )}
        </div>

        <input
          {...register("name")}
          placeholder="Enter your full name"
          className="placeholder:text-xs placeholder:text-neutral-600 input-dark p-2   bg-neutral-900 w-full focus:outline-0 rounded-sm"
        />
      </div>

      {/* Email */}
      <div className="placeholder:text-xs placeholder:text-neutral-600   flex justify-between items-center ">
        <label
          htmlFor="email"
          className="placeholder:text-xs placeholder:text-neutral-600  "
        >
          Email
        </label>

        {errors.email && (
          <p className="placeholder:text-xs placeholder:text-neutral-600 text-red-800 text-xs">
            {errors.email.message}
          </p>
        )}
      </div>
      <input
        {...register("email")}
        placeholder="abc@gmail.com"
        className="placeholder:text-xs placeholder:text-neutral-600 input-dark px-2 focus:outline-0  bg-neutral-900 rounded-sm w-full py-2"
      />

      {/* Password */}
      <div className="placeholder:text-xs placeholder:text-neutral-600  flex justify-between items-center">
        <label
          htmlFor="password"
          className="placeholder:text-xs placeholder:text-neutral-600 block "
        >
          Password
        </label>
        {errors.password && (
          <p className="placeholder:text-xs placeholder:text-neutral-600 text-red-800 text-xs">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="placeholder:text-xs placeholder:text-neutral-600 relative py-2 bg-neutral-900 rounded-sm">
        <input
          {...register("password")}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="placeholder:text-xs placeholder:text-neutral-600 input-dark px-2  focus:outline-0"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="placeholder:text-xs placeholder:text-neutral-600 absolute top-1/2  right-3 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="placeholder:text-xs placeholder:text-neutral-600 flex justify-between items-center  ">
        <label
          htmlFor="confirmPassword"
          className="placeholder:text-xs placeholder:text-neutral-600 block "
        >
          Confirm password
        </label>
        {errors.confirmPassword && (
          <p className="placeholder:text-xs placeholder:text-neutral-600 text-red-800 text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="placeholder:text-xs placeholder:text-neutral-600 relative  py-2 bg-neutral-900 rounded-sm">
        <input
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          className="placeholder:text-xs placeholder:text-neutral-600 input-dark px-2  focus:outline-0"
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="placeholder:text-xs placeholder:text-neutral-600 absolute top-1/2  right-3 -translate-y-1/2 cursor-pointer"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <Button>
        {authData?.isError ? (
          <span className="text-xs">{authData?.isError.message}</span>
        ) : authData?.isLoading ? (
          <Loader />
        ) : (
          <>
            <CiMail className="text-lg" /> Signup
          </>
        )}
      </Button>
      <p className="placeholder:text-xs placeholder:text-neutral-600 text-xs text-center text-gray-400 ">
        By signing in, you agree to our{" "}
        <span className="placeholder:text-xs placeholder:text-neutral-600 font-bold text-white cursor-pointer ">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="placeholder:text-xs placeholder:text-neutral-600 font-bold text-white cursor-pointer ">
          Privacy Policy
        </span>
        .
      </p>
    </form>
  );
}
