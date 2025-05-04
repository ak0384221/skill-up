import Button from "../shared/Button";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { AiFillGithub } from "react-icons/ai";
export default function Login() {
  return (
    <div className=" flex items-center justify-center px-2 border-1 border-[#d4d4d4] my-7 rounded-sm w-4/5">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg px-6 py-8">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Login to your account
        </h2>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#292929] mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border-1 border-[#c7c7c7] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#292929] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border-1  border-[#c7c7c7] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-[#424242]">
              <input type="checkbox" className="form-checkbox mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <Button className={`w-full h-10`} variant="blue">
            Click me
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#303030]">
          Don’t have an account?
          <a
            href="/signup"
            className="text-blue-500 hover:underline font-medium mx-2"
          >
            Sign up
          </a>
        </p>
        <div className=" flex  gap-2 justify-center my-2">
          <FcGoogle className="size-6 cursor-pointer hover:scale-115 transition-all " />
          <SiFacebook className="size-6 cursor-pointer hover:scale-115 transition-all " />
          <AiFillGithub className="size-6 cursor-pointer hover:scale-115 transition-all " />
        </div>
      </div>
    </div>
  );
}
