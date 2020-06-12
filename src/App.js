import React from "react";
import { ForceUpdateDemo } from "./ForceUpdateDemo";
import { UseTransitionDemo } from "./UseTransitionDemo";
import { SuspenseDemo } from "./SuspenseDemo";

export function App() {
  return (
    <>
      <ForceUpdateDemo />
      <UseTransitionDemo />
      <SuspenseDemo />
    </>
  );
}
