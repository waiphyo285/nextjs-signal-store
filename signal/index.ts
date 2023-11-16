class Signal<T> {
  private state: T;
  private observers: Set<any>;

  constructor(initialState: T) {
    this.state = initialState;
    this.observers = new Set();
  }

  get() {
    return this.state;
  }

  set(newState: Partial<T>) {
    this.state = { ...this.state, ...newState };
    this.emitSignal();
  }

  subscribe(observer: any) {
    this.observers.add(observer);
    return () => this.unsubscribe(observer);
  }

  unsubscribe(observer: any) {
    this.observers.delete(observer);
  }

  emitSignal() {
    this.observers.forEach((observer) => observer(this.state));
  }
}

export default Signal;
