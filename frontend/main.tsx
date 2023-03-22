import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Hero from "./pages/Hero/Hero";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Verify from "./pages/Authentication/Verify";
import ResendVerify from "./pages/Authentication/ResendVerify";
import Navbar from "./components/Navbar";
import { AuthProvider, RequireAuth } from "react-auth-kit";

import "./index.css";
import Marketplace from "./pages/Marketplace/Marketplace";
import Upload from "./pages/Upload/Upload";
import Profile from "./pages/Profile/Profile";
import TradeCentre from "./pages/TradeCentre/TradeCentre";
import Error from "./pages/Error";

//for using nested routes check out: https://reactrouter.com/en/main/start/tutorial
//info is under the   " nested routes " title, you pretty much need to use an <outlet> to mark
//where in the parent route you want the children to render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
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
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/resendverify",
        element: <ResendVerify />,
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
        path: "/profile",
        element: (
          <RequireAuth loginPath={"/login"}>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "/profile/:username",
        element: (
          <RequireAuth loginPath={"/login"}>
            <Profile />
          </RequireAuth>
        ),
        loader: ({ params }) => {
          return null;
        },
        action: ({ params }) => {},
      },
      {
        path: "/upload",
        element: (
          <RequireAuth loginPath={"/login"}>
            <Upload />
          </RequireAuth>
        ),
      },
      {
        path: "/tradecentre",
        element: (
          <RequireAuth loginPath={"/login"}>
            <TradeCentre />
          </RequireAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"} //should this be http for now ?
    >
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
