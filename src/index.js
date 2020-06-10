import React from "react";
import { unstable_createRoot } from "react-dom";
import "./index.css";
import App from "./App";

unstable_createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
