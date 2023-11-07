import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface RoutesProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PrivateRoutes({ children }: RoutesProps): any {
  const { signed, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
