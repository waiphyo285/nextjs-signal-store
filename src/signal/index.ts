import { useSyncExternalStore } from "react";

type Observer<T> = (state: T) => void;
type Middleware<T> = (prevState: T, nextState: T) => T;

export function createSignal<T>(initialState: T, storageKey?: string) {
  let state: T = initialState;
  const observers = new Set<Observer<T>>();
  const middlewares: Middleware<T>[] = [];

  const loadState = (storageKey: string, fallback: T): T => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : fallback;
    }
    return fallback;
  };

  const saveState = () => {
    if (typeof window !== "undefined" && storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  };

  const emitSignal = () => {
    requestAnimationFrame(() => {
      observers.forEach((observer) => observer(state));
    });
  };

  const getState = () => state;

  const setState = (newState: Partial<T>) => {
    const updatedState = { ...state, ...newState };

    if (JSON.stringify(updatedState) !== JSON.stringify(state)) {
      let finalState = updatedState;

      for (const middleware of middlewares) {
        finalState = middleware(state, finalState);
      }

      state = finalState;
      emitSignal();
      saveState();
    }
  };

  const subscribe = (observer: Observer<T>): (() => void) => {
    observers.add(observer);
    observer(state);
    return () => observers.delete(observer);
  };

  // Add getServerSnapshot for SSR support
  const getServerSnapshot = (): T => {
    return state; // You can adjust this to provide an SSR-compatible state
  };

  // Use hook to subscribe and get the current state
  const useStore = (): T => {
    return useSyncExternalStore(
      (callback) => subscribe(callback),
      getState, // Client-side snapshot (default)
      getServerSnapshot // Server-side snapshot (required for SSR)
    );
  };

  return { useStore, setState, getState, subscribe, loadState, saveState };
}
