import React from "react";
import ReactDOM from "react-dom/client";
import { RouterManager } from "src/routers/RouterManager";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterManager />
    </NextUIProvider>
  </React.StrictMode>
);
