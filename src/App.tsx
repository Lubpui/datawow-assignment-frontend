import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import PublicRoutes from "./routes/PublicRoutes";
import { useSelector } from "react-redux";
import { isAuthentedSelector } from "./store/slices/auth.slice";
import Layout from "./layouts/Layout";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const isAuthented = useSelector(isAuthentedSelector);

  const appTheme = createTheme();

  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        {/* <Route
        path="/core"
        element={
          <PrivateRoutes
            isAuthented={isAuthented}
            expiredDate={companyInfo?.mainPackage?.expiredDate}
          />
        }
      >
        <Route
          path="/core"
          element={<Navigate to={RoutePath.TIME_ATTENDANCE_PAGE} />}
        />
        <Route path="/core" element={<Layout isAuthented={isAuthented} />}>
          {privateRoutes.map(({ path, permissions, Component }, index) => {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <PermissionRoutes
                    path={path}
                    permissions={permissions}
                    children={<Component />}
                    expiredDate={companyInfo?.mainPackage?.expiredDate}
                  />
                }
              />
            );
          })}
          <Route
            path="*"
            element={<Navigate to={RoutePath.TIME_ATTENDANCE_PAGE} />}
          />
        </Route>
      </Route> */}

        <Route path="/" element={<PublicRoutes isAuthented={isAuthented} />}>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth" element={<Layout isAuthented={isAuthented} />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
          </Route>
        </Route>
        {/* <Route path="/notfound" element={<NotFound />} /> */}
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
