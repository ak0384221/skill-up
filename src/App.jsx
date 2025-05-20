import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { SettingContext } from "./Context/SettingContext";

function App() {
  const { theme, font, fontWeight } = useContext(SettingContext);
  return (
    <>
      <div className=" h-[10vh]  w-full fixed top-0  bg-transparent">
        <Header />
      </div>

      <div
        className={`font-${font} font-${fontWeight}   min-h-screen flex justify-center items-start w-full mx-auto  font-bold  pt-18 ${
          (theme == "Dark" && "bg-[#181717] text-white") ||
          (theme === "Light" && "bg-[#eef7fd] text-black") ||
          (theme === "System" && "dark:bg-[#181717] text-white")
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
