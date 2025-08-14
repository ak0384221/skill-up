import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../Micro/LoginForm";
import SignupForm from "../Micro/SignupForm";
import { ContextAPI } from "../../Context/ContextAPI";
import GradientWrapper from "../Micro/GradientWrapper";

export default function Login() {
  const [authType, setAuthType] = useState("login");
  const { authData, setAuthData } = useContext(ContextAPI);
  return (
    <GradientWrapper noSpace="true">
      <div className=" h-full  bg-black w-full   rounded-xl  px-8 py-5   ">
        {/* Logo */}
        <div className="text-center  size-14 mx-auto border-2 border-[#2b2b2b] rounded-full p-2">
          <img src="/logo.png" className="w-full h-full" alt="" />
        </div>
        <div className="text-neutral-100  text-center my-3">
          <h2 className="text-xl font-bold">Welcome</h2>
          <p className="text-neutral-500 capitalize">sign in to your account</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center   bg-[#141414] h-10  w-full  mx-auto rounded-sm">
          <button
            onClick={() => {
              setAuthType("login");
              setAuthData((data) => {
                return { ...data, isError: null };
              });
            }}
            className={`h-full w-1/2 rounded-sm  text-sm font-medium ${
              authType === "login" ? "bg-[#c5c3c3] text-black" : "text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setAuthType("signup");
              setAuthData((data) => {
                return { ...data, isError: null };
              });
            }}
            className={`h-full w-1/2 rounded-sm  text-sm font-medium ${
              authType === "signup" ? "bg-[#c5c3c3] text-black" : "text-white"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Animated Form */}
        <AnimatePresence mode="wait">
          {authType === "login" ? (
            <motion.div
              className="w-full "
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <LoginForm />
            </motion.div>
          ) : (
            <motion.div
              className="w-full"
              key="signup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SignupForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GradientWrapper>
  );
}
