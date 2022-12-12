import React from "react";
import ConfirmRemoving from "../ui/pages/confirm-removing/ConfirmRemoving";
import CreateEntity from "../ui/pages/create-entity/CreateEntity";
import CreateWarehouse from "../ui/pages/create-warehouse/CreateWarehouse";
import EntityPage from "../ui/pages/entity-page/EntityPage";
import ForgotPassword from "../ui/pages/forgot-password/ForgotPassword";
import Help from "../ui/pages/help/Help";
import HomePage from "../ui/pages/home-page/HomePage";
import MainPage from "../ui/pages/main-page/MainPage";
import Settings from "../ui/pages/settings/Settings";
import SignIn from "../ui/pages/sign-in/SignIn";
import SignUp from "../ui/pages/sign-up/SignUp";
import UpdateWarehouse from "../ui/pages/update-warehouse/UpdateWarehouse";
import WarehousePage from "../ui/pages/warehouse-page/WarehousePage";
import { PATH_VARIBLES } from "../utils/Constants";

const routes = [
  { path: PATH_VARIBLES.MAIN, element: <MainPage />, exact: true },
  { path: PATH_VARIBLES.HELP, element: <Help />, exact: true },
  {
    path: PATH_VARIBLES.SIGN_IN,
    needAuth: false,
    element: <SignIn />,
    exact: true,
  },
  {
    path: PATH_VARIBLES.SIGN_UP,
    needAuth: false,
    element: <SignUp />,
    exact: true,
  },
  {
    path: PATH_VARIBLES.FORGOT_PASSWORD,
    needAuth: false,
    element: <ForgotPassword />,
    exact: true,
  },
  {
    path: PATH_VARIBLES.HOME,
    needAuth: true,
    element: <HomePage />,
    exact: true,
  },
  {
    path: PATH_VARIBLES.SETTINGS,
    needAuth: true,
    element: <Settings />,
    exact: true,
  },
  {
    path: `${PATH_VARIBLES.WAREHOUSE}:${PATH_VARIBLES.WAREHOUSE_ID}`,
    needAuth: true,
    element: <WarehousePage />,
    exact: true,
  },
  {
    path: PATH_VARIBLES.CREATE_WAREHOUSE,
    needAuth: true,
    element: <CreateWarehouse />,
    exact: true,
  },
  {
    path: `${PATH_VARIBLES.UPDATE_WAREHOUSE}:${PATH_VARIBLES.WAREHOUSE_ID}`,
    needAuth: true,
    element: <UpdateWarehouse />,
    exact: true,
  },
  {
    path: `${PATH_VARIBLES.WAREHOUSE}:${PATH_VARIBLES.WAREHOUSE_ID}${PATH_VARIBLES.CONFIRM_REMOVING}`,
    needAuth: true,
    element: <ConfirmRemoving />,
    exact: true,
  },
  {
    path: `${PATH_VARIBLES.WAREHOUSE}:${PATH_VARIBLES.WAREHOUSE_ID}${PATH_VARIBLES.CREATE_ENTITY}`,
    needAuth: true,
    element: <CreateEntity />,
    exact: true,
  },
  {
    path: `${PATH_VARIBLES.WAREHOUSE}:${PATH_VARIBLES.WAREHOUSE_ID}${PATH_VARIBLES.ENTITY}:${PATH_VARIBLES.ENTITY_ID}`,
    needAuth: true,
    element: <EntityPage />,
    exact: true,
  },
];

export default routes;
