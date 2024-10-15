import { Suspense, lazy, ElementType } from "react";
import LoadingScreen from "../components/loading-screen";

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
