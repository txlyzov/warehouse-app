import FirstPage from "../ui/pages/FirstPage";
import ForgotPassword from "../ui/pages/forgot-password/ForgotPassword";

export const routes = [
  { path: "/", element: <FirstPage />, exact: true },
  { path: "/sign-in", element: <ForgotPassword />, exact: true },
  { path: "/sign-up", element: <ForgotPassword />, exact: true },
  { path: "/forgot-password", element: <ForgotPassword />, exact: true },
  //   { path: "/123/:id", element: <123 />, exact: true },
];
