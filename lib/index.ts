export interface TinySubscribe<T> {
  unsubscribe: () => TinySubscribe<T>;
  next: (state?: T) => TinySubscribe<T>;
}

/**
 * 迷你版的 rxjs 的 Subject
 */
export default class TinySubject<T> {
  state: T;
  constructor(state: T) {
    this.state = state;
  }
  events: Function[] = [];
  next = (state?: T) => {
    this.events.forEach((fn) => {
      fn(state || this.state);
    });
  };
  setState = (fn: (state: T) => any) => {
    fn(this.state);
    this.next(this.state);
  };
  subscribe = (fn: (state: T) => any): TinySubscribe<T> => {
    this.events.push(fn);
    const scribe = {
      unsubscribe: () => {
        const nextEvents: Function[] = [];
        this.events.forEach((v) => {
          if (v !== fn) {
            nextEvents.push(v);
          }
        });
        this.events = nextEvents;
        return scribe;
      },
      next: (state?: T) => {
        fn(state || this.state);
        return scribe;
      },
    };

    return scribe;
  };

  subscribeMemo = (memo: (state: T) => any[], fn: (state: T) => any) => {
    let last = this.state ? memo(this.state) : [];
    const len = last.length;
    const sub = this.subscribe((theState) => {
      const current = memo(theState);
      let isKeep = true;
      for (let i = 0; i < len; i++) {
        if (current[i] !== last[i]) {
          isKeep = false;
          break;
        }
      }
      if (isKeep) {
        return;
      }
      fn(theState);
      last = current;
    });
    sub.next = (s) => fn(s || this.state);
    return sub;
  };
}
