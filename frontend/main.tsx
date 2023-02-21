import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Hero from "./pages/Hero/Hero";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Navbar from "./components/Navbar";
import { AuthProvider } from "react-auth-kit";

import "./index.css";
import Marketplace from "./pages/Marketplace/Marketplace";

//for using nested routes check out: https://reactrouter.com/en/main/start/tutorial
//info is under the   " nested routes " title, you pretty much need to use an <outlet> to mark
//where in the parent route you want the children to render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/marketplace",
        element: <Marketplace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
