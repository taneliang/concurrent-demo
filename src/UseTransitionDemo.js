import React, { useCallback, useState, useTransition } from "react";

function CounterButton() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(() => {
    startTransition(() => {
      setTimeout(() => {
        setCount(count + 1);
      }, Math.random() * 1000);
    });
  }, [count, setCount, startTransition]);

  return (
    <button onClick={handleClick}>
      CounterButton {count} {isPending}
    </button>
  );
}

export function UseTransitionDemo() {
  return (
    <>
      <h1>Counters</h1>
      <p>useTransition demo, without Suspense</p>
      {[...Array(5).keys()].map((idx) => (
        <CounterButton key={idx} />
      ))}
    </>
  );
}
