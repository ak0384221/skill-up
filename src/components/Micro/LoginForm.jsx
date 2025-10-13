import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/authSchemas";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { logInAuthHandler, signUpAuthHandler } from "../../utils/authRelated";
import { ContextAPI } from "../../Context/ContextAPI";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import Loader from "../shared/loader";
import Button from "../shared/Button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { authData, setAuthData } = useContext(ContextAPI);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login:", data);
    setAuthData((data) => {
      return { ...data, isLoading: true, isError: null };
    });
    logInAuthHandler(data, setAuthData, navigate);
  };

  function handleGuestLogin() {
    setValue("email", "guest001@gmail.com");
    setValue("password", "guest001");
    handleSubmit(onSubmit)();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 py-2  text-white mx-auto   w-full mt-3  "
    >
      {/* Email */}
      <div className=" w-full ">
        <div className="flex  justify-between items-center mb-2">
          <label className=" block   w-max" htmlFor="email">
            Email
          </label>
          {errors.email && (
            <span className="text-red-800 text-xs  ">
              {errors.email.message}
            </span>
          )}
        </div>

        <input
          {...register("email")}
          placeholder="abc@gmail.com"
          className="input-dark px-2 focus:outline-0 rounded-sm bg-[#080808] h-10  w-full "
        />
      </div>

      {/* Password with toggle */}
      <div className="relative w-full  ">
        <div className="flex  justify-between items-end gap-2 mb-2">
          <label className=" block  w-max " htmlFor="password">
            Password
          </label>
          {errors.password && (
            <span className="text-red-800 text-xs   ">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="relative ">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input-dark px-2 h-10 rounded-sm focus:outline-0 w-full bg-[#080808]  "
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2  right-3 -translate-y-1/2 cursor-pointer text-gray-400  "
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </span>
        </div>
      </div>

      <div className=" text-right text-neutral-400">
        <Link to="#" className="text-xs ">
          Forgot password
        </Link>
      </div>

      <Button>
        {authData?.isError ? (
          <span className="text-xs">{authData?.isError.message}</span>
        ) : authData?.isLoading ? (
          <Loader variant="dark" />
        ) : (
          <>
            <CiMail className="text-lg" /> Login
          </>
        )}
      </Button>

      <Button onClick={handleGuestLogin} className>
        Continue as Guest
      </Button>
    </form>
  );
}
