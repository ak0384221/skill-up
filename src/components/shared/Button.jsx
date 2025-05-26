import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "./loader";
import { FetchingContext } from "../../Context/FetchingContext";
export default function Button({
  children,
  variant = "",
  className = "",
  onClick = "",
  ...props
}) {
  function getBtnColor() {
    const { AuthLoading } = useContext(AuthContext);
    const { postLoading } = useContext(FetchingContext);
    switch (variant) {
      case "light":
        return "px-3  w-full h-10 bg-gradient-to-r from-purple-500 to-pink-500  hover:from-purple-600 hover:to-pink-600   active:scale-97 transition  flex justify-center items-center text-white";

      case "createPost":
        return "cursor-pointer text-white px-4 py-2 w-full rounded bg-gradient-to-r from-purple-500 to-pink-500  hover:from-purple-600 hover:to-pink-600   active:scale-97 transition";
    }
  }
  return (
    <button
      type="submit"
      {...(onClick && { onClick })}
      className={`cursor-pointer rounded-sm ${getBtnColor()}  text-white font-[500] active:scale-99 transition-all  tracking-wide hover:opacity-90   ${className}`}
    >
      {children}
    </button>
  );
}
