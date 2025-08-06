import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  const path = location.pathname;

  // This hides the header only for routes like /messenger/abc123
  const hideHeader = /^\/messenger\/[^/]+$/.test(path);
  return (
    <>
      {!hideHeader && (
        <div className="h-[10vh] w-full fixed top-0 z-999">
          <Header />
        </div>
      )}
      <div className="flex justify-center ">
        <ScrollToTop />
        <Outlet />
      </div>
    </>
  );
}

export default App;
