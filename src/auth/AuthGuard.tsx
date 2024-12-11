import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
// components
import LoadingScreen from "../components/loading-screen";
//
import { useAuthContext } from "./useAuthContext";
import { PATH_AUTH } from "../routes/paths";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();
  const { pathname } = useLocation();
  //const navigate = useNavigate();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!isAuthenticated && pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
  }, [isAuthenticated, pathname, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    //navigate(PATH_AUTH.login, { replace: true });
    return <Navigate to={PATH_AUTH.login} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation || "/"} />;
  }

  return children;
}
