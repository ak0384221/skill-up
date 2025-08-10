export default function GradientWrapper({ children, noSpace = false }) {
  return (
    <div
      className={`w-[90vw] md:w-2/3 lg:w-2/5 p-1.25 text-white  bg-radial-ocean  shadow-[0_0_20px_#2c5dac] rounded-xl ${
        noSpace ? "mt-[7vh]" : " mt-[13vh]"
      } `}
    >
      {children}
    </div>
  );
}
