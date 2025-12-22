import { useCounterStore } from './_private/counter.context';

export default function ZustandPage() {
  const { increment, decrement, reset } = useCounterStore((state) => state);
  return (
    <div>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
