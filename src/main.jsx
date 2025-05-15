import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ParentContextProvider from "./Context/ParentContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./components/Posts.jsx";
import Images from "./components/Images.jsx";
import CreatePost from "./components/CreatePosts.jsx";
import Reels from "./components/Reels.jsx";
import Login from "./components/Login.jsx";
import Normal from "./components/Normal.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import NotLoggedIn from "./Errors/NotLoggedIn.jsx";
import SignUpForm from "./components/SignUp.jsx";
import UserProfile from "./components/Userprofile.jsx";
import Settings from "./components/Settings.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ParentContextProvider>
        <App />
      </ParentContextProvider>
    ),
    children: [
      { path: "/normal", element: <Normal /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/", element: <SignUpForm /> },

      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/posts", element: <Posts /> },
          { path: "/images", element: <Images /> },
          { path: "/create-post", element: <CreatePost /> },
          { path: "/user", element: <UserProfile /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
