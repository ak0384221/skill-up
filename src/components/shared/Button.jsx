export default function Button({
  children,
  variant,
  onClick = "",
  className = "",
}) {
  return (
    <button
      {...(onClick && { onClick })}
      type="submit"
      className={`h-12 active:scale-95  text-sm w-full my-2 rounded-3xl font-bold   cursor-pointer  flex justify-center items-center gap-2 p-1 ${
        variant === "dark"
          ? "bg-[#1b1b1b] text-white"
          : "bg-[#c2c2c2] text-black"
      } hover:opacity-75 transition-opacity`}
    >
      {children}
    </button>
  );
}
