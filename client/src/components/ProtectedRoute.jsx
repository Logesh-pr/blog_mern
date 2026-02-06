import { useContext } from "react";

//react router
import { Navigate } from "react-router-dom";

//context
import { AuthContext } from "../context/Context";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
