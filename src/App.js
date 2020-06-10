import React, {
  Suspense,
  useCallback,
  useState,
  unstable_useTransition,
} from "react";

function CounterButton() {
  const [count, setCount] = useState(0);
  const [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 1000,
  });

  // TODO: Figure out why this doesn't suspend :(

  const handleClick = useCallback(() => {
    startTransition(() => {
      setTimeout(() => {
        setCount(count + 1);
      }, 2000);
    });
  }, [count, setCount, startTransition]);

  return (
    <button style={{ display: "block" }} onClick={handleClick}>
      Button {count} {isPending}
    </button>
  );
}

function SuspenseDemo() {
  return (
    <>
      <Suspense fallback="SUSPENDED">
        {[...Array(5).keys()].map((idx) => (
          <CounterButton key={idx} />
        ))}
      </Suspense>
    </>
  );
}

function App() {
  return <SuspenseDemo />;
}

export default App;
