import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { BASE_NAME, PAGE } from "src/constants/router";

import { ProtectedRoute, PublicRoute } from "src/middleware";
import ChatBot from "src/pages/ChatBot";

import Login from "src/pages/Login";
import { isAuthenticated } from "./helpers";
import { Toaster } from "sonner";
import NotFound from "src/pages/NotFound";
import CrawlData from "src/pages/crawlData/CrawlData";
import Register from "src/pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PublicRoute />}>
        <Route
          path={PAGE.LOGIN}
          element={<Login />}
          loader={async () => await isAuthenticated()}
        />
        <Route
          path={PAGE.REGISTER}
          element={<Register />}
          loader={async () => await isAuthenticated()}
        />
        {/* <Route path="/" element={<Navigate to={PAGE.LOGIN} />} /> */}
      </Route>

      {/* <Route element={<MainLayout />}> */}
      <Route element={<ProtectedRoute />}>
        <Route path={PAGE.CRAWL_DATA} element={<CrawlData />} />
        <Route path={PAGE.CHAT_BOT} element={<ChatBot />} />
        <Route path="/" element={<CrawlData />} />
        <Route path="*" element={<NotFound />} />
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
