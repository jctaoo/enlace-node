"use strict";
// todo 查看其他方法
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _observer;
Object.defineProperty(exports, "__esModule", { value: true });
class ObservableMap extends Map {
    constructor() {
        super(...arguments);
        _observer.set(this, []);
    }
    observeChange(block) {
        __classPrivateFieldGet(this, _observer).push(block);
    }
    // @ts-ignore
    set(key, value) {
        super.set(key, value);
        this.callObservers({ key, value });
        return this;
    }
    callObservers(change) {
        __classPrivateFieldGet(this, _observer).forEach(obs => {
            obs(change);
        });
    }
}
exports.default = ObservableMap;
_observer = new WeakMap();
//# sourceMappingURL=observable_map.js.map