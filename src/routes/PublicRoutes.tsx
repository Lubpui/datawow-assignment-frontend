import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type PublicRoutesProps = {
  isAuthented: boolean;
};

const PublicRoutes: React.FunctionComponent<PublicRoutesProps> = ({
  isAuthented,
}) => {
  const pinnedPath = localStorage.getItem("pin_menu");
  const iniailPath = pinnedPath ? pinnedPath : "time-attendance";
  return isAuthented ? <Navigate to={`/core/${iniailPath}`} /> : <Outlet />;
};

export default PublicRoutes;
