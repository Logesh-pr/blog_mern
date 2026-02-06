import { useContext } from "react";

//react dom
import { Navigate } from "react-router-dom";

//context
import { AuthContext } from "../context/Context";

export default function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}
