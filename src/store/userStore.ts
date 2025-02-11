import { createSignal } from "@/src/signal";

type IUserSignal = { users: { id: number; name: string; email: string }[] };

export const userSignal = createSignal<IUserSignal>({ users: [] }, "userStore");

export const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  userSignal.setState({ users: data });
};
