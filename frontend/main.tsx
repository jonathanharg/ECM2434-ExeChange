import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Navbar from "./Navbar";

import "./index.css";

//for using nested routes check out: https://reactrouter.com/en/main/start/tutorial
//info is under the   " nested routes " title, you pretty much need to use an <outlet> to mark
//where in the parent route you want the children to render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <Login /> },
      {
        path: "/test1",
        element: <div>Test 1!</div>,
      },
      {
        path: "/test2",
        element: <div>Test 2!</div>,
      },
      {
        path: "/test3",
        element: <div>Test 3!</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
