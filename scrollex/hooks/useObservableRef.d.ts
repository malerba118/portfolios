declare type Cleanup = (() => void) | void;
declare type Subscriber<T> = (next: T) => Cleanup;
declare type Unsubscribe = () => void;
export declare class ObservableRef<T> {
    private value;
    private subscriptions;
    current: T;
    constructor(defaultValue: T);
    subscribe(subscriber: Subscriber<T>): Unsubscribe;
    private notify;
}
declare const useObservableRef: <T>(defaultValue: T) => ObservableRef<T>;
export default useObservableRef;
