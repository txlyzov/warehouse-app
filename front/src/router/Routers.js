import React from "react";
import FirstPage from "../ui/pages/FirstPage";
import ForgotPassword from "../ui/pages/forgot-password/ForgotPassword";
import HomePage from "../ui/pages/home/HomePage";
import SignIn from "../ui/pages/sign-in/SignIn";
import SignUp from "../ui/pages/sign-up/SignUp";

const routes = [
  { path: "/", element: <FirstPage />, exact: true },
  { path: "/sign-in", element: <SignIn />, exact: true },
  { path: "/sign-up", element: <SignUp />, exact: true },
  { path: "/forgot-password", element: <ForgotPassword />, exact: true },
  { path: "/home", element: <HomePage />, exact: true },
  //   { path: "/123/:id", element: <123 />, exact: true },
];

export default routes;
