import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <div className=" h-[10vh]  w-full fixed top-0 z-999  ">
        <Header />
      </div>
      <div className="flex justify-center bg-[#1E201E]  ">
        <ScrollToTop />
        <Outlet />
      </div>
    </>
  );
}

export default App;
