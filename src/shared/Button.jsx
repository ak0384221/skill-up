export default function Button({
  children,
  variant = "",
  className = "",
  ...props
}) {
  function getBtnColor() {
    switch (variant) {
      case "green":
        return "bg-green-600";
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  }
  return (
    <button
      className={`cursor-pointer rounded-sm ${getBtnColor()}  text-white font-[500] active:scale-99 transition-all font-Inter tracking-wide text-sm hover:opacity-90  my-3 ${className}`}
    >
      {children}
    </button>
  );
}
