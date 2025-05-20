import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ParentContextProvider from "./Context/ParentContext.jsx";
import Posts from "./components/Pages/Posts.jsx";
import CreatePost from "./components/Pages/CreatePosts.jsx";
import Login from "./components/Pages/Login.jsx";
import Normal from "./components/Normal.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import NotLoggedIn from "./components/Errors/NotLoggedIn.jsx";
import SignUpForm from "./components/Pages/SignUp.jsx";
import UserProfile from "./components/Pages/Userprofile.jsx";
import Settings from "./components/Pages/Settings.jsx";
import LogoutModal from "./components/Modal/logOUtModal.jsx";
import EditFields from "./components/editFields.jsx";
import PostSkeleton from "./components/PostSkeleton/postSkeleton.jsx";

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
          { path: "/create-post", element: <CreatePost /> },
          { path: "/user", element: <UserProfile /> },
          { path: "/settings", element: <Settings /> },
          { path: "/editFields", element: <EditFields /> },
          { path: "/test", element: <PostSkeleton /> },
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
