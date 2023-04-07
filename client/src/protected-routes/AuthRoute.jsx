import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  return props.user ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
