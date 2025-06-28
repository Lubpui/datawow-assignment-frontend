import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import PublicRoutes from "./routes/PublicRoutes";
import { useSelector } from "react-redux";
import { isAuthentedSelector } from "./store/slices/auth.slice";
import Layout from "./layouts/Layout";
import { createTheme, ThemeProvider } from "@mui/material";
import HomePage from "./pages/Home/HomePage";
import OurBlogPage from "./pages/OurBlog/OurBlogPage";
import PostDetails from "./pages/Home/components/PostDetails";
import { RoutePath } from "./utils/route.util";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const isAuthented = useSelector(isAuthentedSelector);

  const appTheme = createTheme();

  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route
            path="/"
            element={<Navigate to={`core/${RoutePath.HOME}`} />}
          />
          <Route path="/core" element={<Layout isAuthented={isAuthented} />}>
            <Route path={RoutePath.HOME} element={<HomePage />} />
            <Route path={RoutePath.POST_DETAILS} element={<PostDetails />} />
            <Route path={RoutePath.OUR_BLOG} element={<OurBlogPage />} />
            <Route path="/core" element={<Navigate to={RoutePath.HOME} />} />
          </Route>

          <Route path="/" element={<PrivateRoutes isAuthented={isAuthented} />}>
            <Route path="/auth" element={<Layout isAuthented={isAuthented} />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="/auth" element={<Navigate to={RoutePath.LOGIN} />} />
            </Route>
          </Route>
        </Route>
        {/* <Route path="/notfound" element={<NotFound />} /> */}
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
