import HomePage from "../Home/HomePage";
import { cookieConstants } from "../../constants/localStorage.constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

const OurBlogPage = () => {
  const renderContent = useMemo(() => {
    const token = Cookies.get(cookieConstants.TOKEN_KEY);
    if (!token) return <></>
    
    const decodedToken = jwtDecode(token) as { username: string };
  
    return <HomePage username={decodedToken.username} />;
  }, [])

  return <>{renderContent}</>;
};

export default OurBlogPage;
