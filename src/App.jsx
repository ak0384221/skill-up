import Header from "./components/Header";
import Footer from "./components/Footer";
import Normal from "./components/Normal";
import { Outlet } from "react-router-dom";
import AppContextProvider from "./Context/contextApi";

function App() {
  return (
    <>
      <AppContextProvider>
        <Header />
        <div className=" flex justify-center items-center  font-bold ">
          <Outlet />
        </div>
        <Footer />
      </AppContextProvider>
    </>
  );
}

export default App;
