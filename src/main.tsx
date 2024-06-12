import React from "react";
import ReactDOM from "react-dom/client";
import { RouterManager } from "src/routers/RouterManager";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./store";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterManager />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
