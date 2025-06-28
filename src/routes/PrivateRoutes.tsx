import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type PrivateRoutesProps = {
  isAuthented: boolean;
  expiredDate?: string;
};

const PrivateRoutes: React.FunctionComponent<PrivateRoutesProps> = ({
  isAuthented,
}) => {
  if (isAuthented) {
    return <Navigate to="/core/home" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
