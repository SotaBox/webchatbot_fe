import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { PAGE } from "src/constants/router";

export const isAuthenticated = async () => {
  const token = Cookies.get("AccessToken");
  if (token) throw redirect(PAGE.CRAWL_DATA);
  return null;
};
