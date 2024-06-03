import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { BASE_NAME, PAGE } from "src/constants/router";

import { ProtectedRoute, PublicRoute } from "src/middleware";
import ChatBot from "src/pages/ChatBot";
import CrawlData from "src/pages/CrawlData";
import Login from "src/pages/Login";
import SiteMap from "src/pages/SiteMap";
import { isAuthenticated } from "./helpers";
import { Toaster } from "sonner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PublicRoute />}>
        <Route
          path={PAGE.LOGIN}
          element={<Login />}
          loader={async () => await isAuthenticated()}
        />
        {/* <Route path="/" element={<Navigate to={PAGE.LOGIN} />} /> */}
      </Route>

      {/* <Route element={<MainLayout />}> */}
      <Route element={<ProtectedRoute />}>
        <Route path={PAGE.CHAT_BOT} element={<ChatBot />} />
        <Route path={PAGE.SITEMAP} element={<SiteMap />} />
        <Route path={PAGE.CRAWL_DATA} element={<CrawlData />} />
        <Route path="*" element={<Navigate to={PAGE.NOT_FOUND} />} />
      </Route>
      {/* </Route> */}
    </Route>
  ),
  {
    basename: BASE_NAME,
  }
);

export function RouterManager() {
  return (
    <>
      <Toaster position="top-center" /> <RouterProvider router={router} />
    </>
  );
}
