
import useCounter from "../hooks/useCounter";

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div>
      <h2>Counter Demo</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterDemo;
