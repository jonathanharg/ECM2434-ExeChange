import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Login";

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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
