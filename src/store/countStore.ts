import createSignal from "@/src/signal/index";

type ISignal = { count: number };

export const countSignal = createSignal<ISignal>({ count: 0 }, "countStore");
