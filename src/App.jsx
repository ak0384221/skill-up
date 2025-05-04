import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ParentContextProvider from "./Context/ParentContext";

function App() {
  return (
    <>
      <ParentContextProvider>
        <Header />
        <div className=" flex justify-center items-center  font-bold ">
          <Outlet />
        </div>
        <Footer />
      </ParentContextProvider>
    </>
  );
}

export default App;
