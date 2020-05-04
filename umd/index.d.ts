export interface TinySubscribe<T> {
    unsubscribe: () => TinySubscribe<T>;
    next: (state?: T) => TinySubscribe<T>;
}
/**
 * 迷你版的 rxjs 的 Subject
 */
export default class TinySubject<T> {
    state: T;
    constructor(state: T);
    events: Function[];
    next: (state?: T | undefined) => void;
    setState: (fn: (state: T) => any) => void;
    subscribe: (fn: (state: T) => any) => TinySubscribe<T>;
    subscribeMemo: (memo: (state: T) => any[], fn: (state: T) => any) => TinySubscribe<T>;
}
