import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type PublicRoutesProps = {
  isAuthented: boolean;
};

const PublicRoutes: React.FunctionComponent<PublicRoutesProps> = ({
  isAuthented,
}) => {
  return isAuthented ? <Navigate to={`/core/home`} /> : <Outlet />;
};

export default PublicRoutes;
