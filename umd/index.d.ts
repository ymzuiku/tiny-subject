export interface TinySubscribe<T> {
    unsubscribe: Function;
    next: (state: T) => any;
}
/**
 * 迷你版的 rxjs 的 Subject
 */
export default class TinySubject<T> {
    eventList: any;
    next: (state?: T | undefined) => void;
    subscribe: (fn: (state: T) => any) => {
        unsubscribe: () => void;
        next: (state: T) => void;
    };
}
