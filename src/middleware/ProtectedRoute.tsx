import { Navigate, Outlet } from "react-router-dom";
import { PAGE } from "src/constants/router";
import DefaultLayout from "src/layout/DefaultLayout";
import { useAppSelector } from "src/store";

export function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.accessToken);
  if (!token) return <Navigate to={PAGE.LOGIN} />;
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
