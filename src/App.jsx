import Header from "./components/Header";
import Footer from "./components/Footer";
import Normal from "./components/Normal";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className=" flex justify-center items-center  font-bold ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
