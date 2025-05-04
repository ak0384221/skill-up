export default function Button({ title = "Click me", variant = "blue" }) {
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
      className={` px-4 py-1.5 cursor-pointer rounded-sm hover:rounded-md ${getBtnColor()}  text-white font-[500] active:scale-105 transition-all font-Inter tracking-wide text-sm m-2 `}
    >
      {title}
    </button>
  );
}
