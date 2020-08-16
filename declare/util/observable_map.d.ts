export default class ObservableMap<K, V> extends Map {
    #private;
    observeChange(block: (updated: {
        key: K;
        value: V;
    }) => void): void;
    set(key: K, value: V): ObservableMap<K, V>;
    private callObservers;
}
