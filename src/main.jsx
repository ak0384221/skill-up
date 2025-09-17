import { lazy, Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import Loader from "./components/shared/loader.jsx";
import ContextAPIprovider from "./Context/ContextAPI.jsx";
const Chats = lazy(() => import("./components/Micro/Chats.jsx"));
const Messenger = lazy(() => import("./components/Pages/Messenger.jsx"));
const Posts = lazy(() => import("./components/Pages/Posts.jsx"));
const CreatePost = lazy(() => import("./components/Pages/CreatePosts.jsx"));
const Login = lazy(() => import("./components/Pages/Login.jsx"));
const User = lazy(() => import("./components/Pages/user.jsx"));
const UpdateProfileForm = lazy(() =>
  import("./components/Pages/UpdateProfileForm.jsx")
);

//sentry//
import * as Sentry from "@sentry/react";
Sentry.init({
  dsn: "https://16063b996aeb041fbccab5de1ad94aa8@o4510036086423552.ingest.us.sentry.io/4510036104839168",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextAPIprovider>
        <App />
      </ContextAPIprovider>
    ),
    children: [
      { path: "/login", element: <Login /> },

      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/", element: <Posts /> },
          { path: "/create-post", element: <CreatePost /> },
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
    <Suspense
      fallback={
        <div className="relative w-full h-screen text-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20">
            <Loader />
          </div>
        </div>
      }
    >
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>
);
