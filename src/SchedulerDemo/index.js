// Adapted from: https://philippspiess.com/scheduling-in-react/

import React, { useState, useCallback } from "react";
import { NameList, sendAnalyticsPing } from "./helpers";
import {
  unstable_next,
  unstable_scheduleCallback,
  unstable_LowPriority,
} from "scheduler";

export function SchedulerDemo() {
  const [shouldUseScheduler, setShouldUseScheduler] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = useCallback(
    (value) => {
      if (shouldUseScheduler) {
        unstable_next(() => setSearchValue(value));
        unstable_scheduleCallback(unstable_LowPriority, () => {
          sendAnalyticsPing(value);
        });
      } else {
        setSearchValue(value);
        sendAnalyticsPing(value);
      }
    },
    [shouldUseScheduler, setSearchValue]
  );

  const toggleShouldUseScheduler = useCallback(
    () => setShouldUseScheduler(!shouldUseScheduler),
    [shouldUseScheduler, setShouldUseScheduler]
  );

  return (
    <>
      <h1>Scheduler package Demo</h1>
      <p>
        Type something to filter a list of names. The filter process is
        artificially expensive to showcase the value of React's scheduler. Also
        schedules a low priority analytics "ping" (it doesn't do anything). Code
        largely copied from{" "}
        <a
          href="https://philippspiess.com/scheduling-in-react/"
          target="_blank"
          rel="noreferrer noopener"
        >
          here
        </a>
        .
      </p>
      <button onClick={toggleShouldUseScheduler}>
        {shouldUseScheduler ? "Disable scheduler" : "Enable scheduler"}
      </button>
      <SearchBox onChange={handleSearchValueChange} />
      <NameList searchValue={searchValue} />
    </>
  );
}

function SearchBox({ onChange }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setSearchValue(value);
      onChange(value);
    },
    [setSearchValue, onChange]
  );

  return (
    <input
      type="text"
      className="input"
      value={searchValue}
      onChange={handleChange}
      placeholder="Filter 🔍"
    />
  );
}
