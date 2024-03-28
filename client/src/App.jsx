import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Signup from "./components/SignUp";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/SignUp",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
