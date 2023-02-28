import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Hero from "./pages/Hero/Hero";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Navbar from "./components/Navbar";
import { AuthProvider } from "react-auth-kit";

import "./index.css";
import Marketplace from "./pages/Marketplace/Marketplace";
import Upload from "./pages/Upload/Upload";

//for using nested routes check out: https://reactrouter.com/en/main/start/tutorial
//info is under the   " nested routes " title, you pretty much need to use an <outlet> to mark
//where in the parent route you want the children to render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Hero /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/marketplace",
        element: (
          // <RequireAuth loginPath={"/login"}>
          <Marketplace />
          // </RequireAuth>

        ),
      },
      {
        path: "/upload",
        element: <Upload />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"} //should this be http for now ?
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
