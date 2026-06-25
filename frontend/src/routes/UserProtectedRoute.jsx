import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({
  children,
}) {
  const token = localStorage.getItem(
    "access_token"
  );

  const isAdmin = JSON.parse(
    localStorage.getItem("is_admin")
  );

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}