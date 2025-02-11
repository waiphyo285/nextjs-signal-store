import { useEffect, useState } from "react";

type Observer<T> = (state: T) => void;
type Middleware<T> = (prevState: T, nextState: T) => T;

class SignalStore<T> {
  private state: T;
  private observers: Set<Observer<T>>;
  private middlewares: Middleware<T>[];
  private storageKey?: string;

  constructor(initialState: T, storageKey?: string) {
    this.observers = new Set();
    this.middlewares = [];
    this.storageKey = storageKey;
    this.state =
      typeof window !== "undefined" && storageKey
        ? this.loadState(storageKey, initialState)
        : initialState;
  }

  private loadState(storageKey: string, fallback: T): T {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : fallback;
  }

  private saveState() {
    if (typeof window !== "undefined" && this.storageKey) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    }
  }

  private emitSignal() {
    requestAnimationFrame(() => {
      this.observers.forEach((observer) => observer(this.state));
    });
  }

  get(): T {
    return this.state;
  }

  set(newState: Partial<T>) {
    const updatedState = { ...this.state, ...newState };

    if (JSON.stringify(updatedState) !== JSON.stringify(this.state)) {
      let finalState = updatedState;

      for (const middleware of this.middlewares) {
        finalState = middleware(this.state, finalState);
      }

      this.state = finalState;
      this.emitSignal();
      this.saveState();
    }
  }

  subscribe(observer: Observer<T>): () => void {
    this.observers.add(observer);
    observer(this.state);
    return () => this.observers.delete(observer);
  }

  useStore(): T {
    const [state, setState] = useState(this.get());

    useEffect(() => {
      const unsubscribe = this.subscribe(setState);
      return () => unsubscribe();
    }, []);

    return state;
  }
}

function createSignal<T>(initialState: T, storageKey?: string): SignalStore<T> {
  return new SignalStore<T>(initialState, storageKey);
}

export default createSignal;
