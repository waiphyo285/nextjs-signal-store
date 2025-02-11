import { userSignal } from "../store/userStore";

export const fetchUsers = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    userSignal.setState({ users });
  } catch (error) {
    console.error("Failed to fetch users", error);
  }
};
