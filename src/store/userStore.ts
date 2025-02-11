import createSignal from "@/src/signal/index";

type IUser = { id: number; name: string; email: string };
type IUserSignal = { users: IUser[] };

export const userSignal = createSignal<IUserSignal>({ users: [] });
