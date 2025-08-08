export default function Button({
  children,

  className = "",
  onClick = "",
  ...props
}) {
  return (
    <button
      type="submit"
      {...(onClick && { onClick })}
      className={`cursor-pointer rounded-sm bg-gradient-to-r from-[#888585] via-[#6b6b6b] to-[#333333] w-full py-2 text-white font-[500] active:scale-99 transition-all  tracking-wide hover:opacity-90   ${className}`}
    >
      {children}
    </button>
  );
}
