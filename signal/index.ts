export class Signal<T> {
  private state: T;
  private observers: any[];

  constructor(initialState: T) {
    this.state = initialState;
    this.observers = [];
  }

  get() {
    return this.state;
  }

  set(newState: Partial<T>) {
    this.state = { ...this.state, ...newState };
    this.emitSignal();
  }

  subscribe(observer: any) {
    this.observers.push(observer);
  }

  unsubscribe(observer: any) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
  }

  emitSignal() {
    this.observers.forEach((observer) => observer(this.state));
  }
}

export default Signal;
