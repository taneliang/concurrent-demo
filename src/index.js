import React from "react";
import { createRoot } from "react-dom";
import { App } from "./App";

createRoot(document.getElementById("root")).render(
  <React.unstable_DebugTracingMode>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </React.unstable_DebugTracingMode>
);
