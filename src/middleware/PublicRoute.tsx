import { Navigate, Outlet } from "react-router-dom";
import { PAGE } from "src/constants/router";
import { useAppSelector } from "src/store";

export function PublicRoute() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  if (accessToken) return <Navigate to={PAGE.CRAWL_DATA} />;
  return <Outlet />;
}
