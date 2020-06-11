import React, {
  Suspense,
  unstable_SuspenseList as SuspenseList,
  useCallback,
  useState,
} from "react";
import { unstable_createResource } from "react-cache";

function createRandomNumberResource() {
  return unstable_createResource(
    () =>
      new Promise((resolve) => {
        console.log("RESOURCE promise: starting");
        setTimeout(() => {
          console.log("RESOURCE promise: resolving");
          resolve(Math.random());
        }, Math.random() * 2000);
      })
  );
}

function ResourceButton({ resource, onClick }) {
  return (
    <button style={{ display: "block" }} onClick={onClick}>
      ResourceButton {resource.read()}
    </button>
  );
}

function SuspenseFallback() {
  return <div>SUSPENDED</div>;
}

const initialResources = [...Array(5).keys()].map(() =>
  createRandomNumberResource()
);

export function SuspenseDemo() {
  const [resources, setResources] = useState(initialResources);

  const addResource = useCallback(() => {
    setResources([...resources, createRandomNumberResource()]);
  }, [resources, setResources]);

  return (
    <>
      <h1>ResourceButton</h1>
      <p>Suspense demos</p>

      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: "1" }}>
          <h2>All Suspended</h2>
          <p>Suspense wraps all buttons</p>
          <Suspense fallback={<SuspenseFallback />}>
            {resources.map((resource, idx) => (
              <ResourceButton
                key={idx}
                resource={resource}
                onClick={addResource}
              />
            ))}
          </Suspense>
        </div>
        <div style={{ flex: "1" }}>
          <h2>Individually Suspended</h2>
          <p>Suspense wraps individual buttons</p>
          {resources.map((resource, idx) => (
            <Suspense key={idx} fallback={<SuspenseFallback />}>
              <ResourceButton resource={resource} onClick={addResource} />
            </Suspense>
          ))}
        </div>
        <div style={{ flex: "1" }}>
          <h2>SuspenseList</h2>
          <p>SuspenseList wraps all Suspense</p>
          <SuspenseList revealOrder="forwards" tail="collapsed">
            {resources.map((resource, idx) => (
              <Suspense key={idx} fallback={<SuspenseFallback />}>
                <ResourceButton resource={resource} onClick={addResource} />
              </Suspense>
            ))}
          </SuspenseList>
        </div>
      </div>
    </>
  );
}
