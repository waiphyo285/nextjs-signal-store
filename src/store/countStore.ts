import { createSignal } from "@/src/signal";

type ISignal = { count: number };

export const countSignal = createSignal<ISignal>({ count: 0 }, "countStore");
