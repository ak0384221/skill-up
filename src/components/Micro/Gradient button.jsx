export default function GradientBtn({
  children,
  onClick = "",
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-radial-ocean w-max  flex justify-center items-center rounded-2xl p-[2px] ${className}`}
    >
      {children}
    </div>
  );
}
