"use client";

import Signal from "@/signal/index";
import { useState } from "react";

type ISignal = {
  count: number;
};

const signal = new Signal<ISignal>({ count: 0 });

export default function Home() {
  const { count: init_count } = signal.get();

  const [count, setCount] = useState(init_count);

  const handleUpdateCount = (delta: number) => {
    signal.set({ count: count + delta });
  };

  const handleDecrement = () => handleUpdateCount(-1);
  const handleIncrement = () => handleUpdateCount(1);
  const handleReset = () => handleUpdateCount(-count);

  signal.subscribe((state: ISignal) => setCount(state.count));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="h1 text-3xl">Reactive by Signal</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h4 className="h4 text-2xl lg:mb-4 m-2 ">Count: {count}</h4>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={handleDecrement}
        >
          Decrement
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={handleIncrement}
        >
          Increment
        </button>

        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
