import { redirect } from "react-router-dom";
import { PAGE } from "src/constants/router";

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (token) throw redirect(PAGE.SITEMAP);
  return null;
};
