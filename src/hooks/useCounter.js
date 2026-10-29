import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((previousCount) => previousCount + 1);
  }

  function decrement() {
    setCount((previousCount) => previousCount - 1);
  }

  function reset() {
    setCount(initialValue);
  }

  return { count, increment, decrement, reset };
}

export default useCounter;