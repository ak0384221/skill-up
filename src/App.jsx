import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { SettingContext } from "./Context/SettingContext";

function App() {
  const { theme, font, fontWeight } = useContext(SettingContext);
  console.log(theme);
  return (
    <>
      <div className=" h-[10vh]  w-full fixed top-0  bg-transparent">
        <Header />
      </div>

      <div
        className={`font-${font} font-${fontWeight} p-2  flex justify-center items-center w-full mx-auto  font-bold  pt-18 ${
          (theme == "Dark" && "bg-black text-white") ||
          (theme === "Light" && "bg-white text-black") ||
          (theme === "System" && "dark:bg-black text-white")
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
