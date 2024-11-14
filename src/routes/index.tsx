import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/main";
import {
  DashboardHomePage,
  HomePage,
  LoginPage,
  NewPasswordPage,
  UserAccountPage,
  VerifyCodePage,
} from "./elements";
import GuestGuard from "../auth/GuestGuard";
import AuthGuard from "../auth/AuthGuard";
import DashboardLayout from "../layouts/dashboard";
import { PATH_AFTER_LOGIN } from "../config-global";
import CompactLayout from "../layouts/compact";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import UnidadeConsumo from "../section/auth/UnidadeConsumo";
import AuthFirstAccessPage from "../pages/auth/AuthFirstAccessPage";
import ContractOfAdhesionPage from "../pages/dashboard/ContractOfAdhesionPage";

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password/:_email/:_code', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
            { path: 'first-access', element: <AuthFirstAccessPage/>},
            { path: 'consumption-unit', element: <UnidadeConsumo />}
          ],
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to={PATH_AFTER_LOGIN} replace />,
          index: true,
        },
        {
          path: "app",
          element: <DashboardHomePage />,
        },
        {
          path: "user",
          children: [
            {
              element: <Navigate to="/dashboard/user/account" replace />,
              index: true,
            },
            {
              path: "account",
              element: <UserAccountPage />,
            },
          ],
        },
        {
          path: "Contract",
          element: <ContractOfAdhesionPage />,
        },
      ],
    },
    {
      element: <MainLayout />,
      children: [{ element: <HomePage />, index: true }],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
