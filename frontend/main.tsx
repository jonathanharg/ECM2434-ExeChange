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
    children:[
      {path: "/login/:login",
      element: <Login />,},
      {
        path: "/test/:test",
        element: <App />,
        errorElement: <App />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
