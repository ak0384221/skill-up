import { lazy, Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import ParentContextProvider from "./Context/ParentContext.jsx";
import Messenger from "./components/Pages/Messenger.jsx";
import Chats from "./components/Micro/Chats.jsx";
const Posts = lazy(() => import("./components/Pages/Posts.jsx"));
const CreatePost = lazy(() => import("./components/Pages/CreatePosts.jsx"));
const Login = lazy(() => import("./components/Pages/Login.jsx"));
const SignUpForm = lazy(() => import("./components/Pages/SignUp.jsx"));
const EditFields = lazy(() => import("./components/editFields.jsx"));
const PostSkeleton = lazy(() =>
  import("./components/PostSkeleton/postSkeleton.jsx")
);
const User = lazy(() => import("./components/Pages/user.jsx"));
const UpdateProfileForm = lazy(() =>
  import("./components/Pages/UpdateProfileForm.jsx")
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ParentContextProvider>
        <App />
      </ParentContextProvider>
    ),
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUpForm /> },

      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/", element: <Posts /> },
          { path: "/create-post", element: <CreatePost /> },
          { path: "/editFields", element: <EditFields /> },
          { path: "/test", element: <PostSkeleton /> },
          { path: "/vibehives/user/:id", element: <User /> },
          { path: "/updateProfile", element: <UpdateProfileForm /> },
          { path: "/messenger", element: <Messenger /> },
          { path: "/messenger/:receiverId", element: <Chats /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>
);
