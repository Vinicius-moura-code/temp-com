import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";
import { useAuthContext } from "./useAuthContext";
import { formatEmail } from "../utils/format";

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized, mfaPending, mfaEmail } =
    useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  if (mfaPending) {
    return <Navigate to={"/auth/verify/" + formatEmail(mfaEmail || "")} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
