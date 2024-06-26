import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { PAGE } from "src/constants/router";
import DefaultLayout from "src/layout/DefaultLayout";
import { authInit } from "src/store";

export function ProtectedRoute() {
  const token = authInit.accessToken;
  return token ? (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ) : (
    <Navigate to={PAGE.LOGIN} />
  );
}
