"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/src/api/user";
import { countSignal } from "@/src/store/countStore";
import { userSignal } from "@/src/store/userStore";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { count } = countSignal.useStore();
  const { users } = userSignal.useStore();

  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <></>; // Instead of <div>Loading...</div>, return an empty fragment
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 shadow-lg rounded-lg">
      {/* Counter Section */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold mb-4">Counter: {count}</h1>

        <div className="mt-4 space-x-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => countSignal.set({ count: count + 1 })}
          >
            Increment
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => countSignal.set({ count: count - 1 })}
          >
            Decrement
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={() => countSignal.set({ count: 0 })}
          >
            Reset
          </button>
        </div>
      </div>

      {/* User List Section */}
      <div>
        <h1 className="text-2xl font-semibold text-center mb-4">User List</h1>

        {users.length > 0 && (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-gray-100 rounded-lg transition"
              >
                <h2 className="text-lg font-medium text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
