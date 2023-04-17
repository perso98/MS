import { Outlet, Navigate } from "react-router-dom";

function AuthRoute(props) {
  return props.user ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default AuthRoute;
