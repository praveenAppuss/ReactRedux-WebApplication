import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}) {
  const token = localStorage.getItem(
    "access_token"
  );

  const isAdmin = JSON.parse(
    localStorage.getItem("is_admin")
  );

  if (!token || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}