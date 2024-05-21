import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { IsDevelopment } from "src/constants/environment";
import { BASE_NAME, PAGE } from "src/constants/router";
import { ProtectedRoute, PublicRoute } from "src/middleware";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PublicRoute />}>
        <Route path={PAGE.LOGIN} element={<>LOGIN</>} />
        {/* <Route path="*" element={<Navigate to={PAGE.LOGIN} />} /> */}
      </Route>
      {IsDevelopment && <Route path={PAGE.UIKIT} element={<>UI Kit</>}></Route>}

      {/* <Route element={<MainLayout />}> */}
      <Route element={<ProtectedRoute />}>
        <Route path={PAGE.HOMEPAGE} element={<>HOMEPAGE</>} />
        <Route path="*" element={<Navigate to={PAGE.HOMEPAGE} />} />
      </Route>
      {/* </Route> */}
    </Route>
  ),
  {
    basename: BASE_NAME,
  }
);

export function RouterManager() {
  return <RouterProvider router={router} />;
}
