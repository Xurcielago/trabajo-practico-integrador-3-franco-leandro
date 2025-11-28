import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuth }) => {
  return isAuth ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
