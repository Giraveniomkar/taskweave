import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";  // ✅ ADD THIS
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>   {/* ✅ ADD THIS */}
      <App />
    </HashRouter>
  </StrictMode>
);