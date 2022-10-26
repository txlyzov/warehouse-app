import React from "react";
import ConfirmRemoving from "../ui/pages/confirm-removing/ConfirmRemoving";
import EntityPage from "../ui/pages/entity-page/EntityPage";
import ForgotPassword from "../ui/pages/forgot-password/ForgotPassword";
import HomePage from "../ui/pages/home-page/HomePage";
import MainPage from "../ui/pages/main-page/MainPage";
import SignIn from "../ui/pages/sign-in/SignIn";
import SignUp from "../ui/pages/sign-up/SignUp";
import WarehousePage from "../ui/pages/warehouse-page/WarehousePage";

const routes = [
  { path: "/", element: <MainPage />, exact: true },
  { path: "/sign-in", needAuth: false, element: <SignIn />, exact: true },
  { path: "/sign-up", needAuth: false, element: <SignUp />, exact: true },
  {
    path: "/forgot-password",
    needAuth: false,
    element: <ForgotPassword />,
    exact: true,
  },
  { path: "/home", needAuth: true, element: <HomePage />, exact: true },
  {
    path: "/warehouse/:warehouseId",
    needAuth: true,
    element: <WarehousePage />,
    exact: true,
  },
  {
    path: "/warehouse/:warehouseId/confirm-removing",
    needAuth: true,
    element: <ConfirmRemoving />,
    exact: true,
  },
  {
    path: "/warehouse/:warehouseId/entity/:entityId",
    needAuth: true,
    element: <EntityPage />,
    exact: true,
  },
  //   { path: "/123/:id", element: <123 />, exact: true },
];

export default routes;
