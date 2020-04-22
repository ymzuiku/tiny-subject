export interface TinySubscribe<T> {
  unsubscribe: Function;
  next: (state: T) => any;
}

/** 
 * 迷你版的 rxjs 的 Subject
 */
export default class TinySubject<T> {
  eventList = {} as any;
  next = (state?: T) => {
    Object.keys(this.eventList).forEach((k) => {
      const fn = this.eventList[k];
      fn && fn(state);
    });
  };
  subscribe = (fn: (state: T) => any) => {
    const nowKey = Date.now() + Math.random();
    this.eventList[nowKey] = fn;
    return {
      unsubscribe: () => {
        delete this.eventList[nowKey];
      },
      next: (state: T) => {
        fn(state);
      },
    };
  };
}