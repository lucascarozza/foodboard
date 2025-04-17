import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./global.css";
import { enableMSW } from "./api/mocks/_index";

enableMSW().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
