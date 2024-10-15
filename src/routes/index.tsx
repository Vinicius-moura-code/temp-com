import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/main";
import { HomePage } from "./elements";

export default function Router() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [{ element: <HomePage />, index: true }],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
