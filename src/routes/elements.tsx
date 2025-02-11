import { Suspense, lazy, ElementType } from "react";
import LoadingScreen from "../components/loading-screen";

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
export const CookiePage = Loadable(lazy(() => import("../pages/Cookie/CookiePage")))

export const DashboardHomePage = Loadable(lazy(() => import("../pages/dashboard/DashboardHome")));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
