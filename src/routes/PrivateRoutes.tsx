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
    return <Outlet />;
  }
  return <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
