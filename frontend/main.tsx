import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./login";

import "./index.css";
import Marketplace from "./Marketplace/Marketplace";
import Itemtile from "./Marketplace/Itemtile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/debug",
    element: <div className="w-10 h-20"><Itemtile id={undefined} name={undefined} href={undefined} imageSrc={undefined} tag={undefined}/></div>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
