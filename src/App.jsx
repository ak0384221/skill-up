import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ParentContextProvider from "./Context/ParentContext";

function App() {
  return (
    <>
      <ParentContextProvider>
        <div className=" h-[12vh] border w-full fixed top-0 bg-white">
          <Header />
        </div>

        <div className=" flex justify-center items-center   font-bold mt-18  ">
          <Outlet />
        </div>
        <Footer />
      </ParentContextProvider>
    </>
  );
}

export default App;
