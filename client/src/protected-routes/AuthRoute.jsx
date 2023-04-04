import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  return !props.user ? <Navigate to="/auth" replace /> : <Outlet />;
}

export default ProtectedRoute;
