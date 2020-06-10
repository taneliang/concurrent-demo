import React from "react";
import { unstable_createRoot } from "react-dom";
import App from "./App";

unstable_createRoot(document.getElementById("root")).render(
  <React.unstable_DebugTracingMode>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </React.unstable_DebugTracingMode>
);
