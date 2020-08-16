"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _stored;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = exports.getParams = exports.typeInfo = void 0;
const injector_type_1 = require("./injector_type");
require("reflect-metadata");
exports.typeInfo = new Map();
function getParams(target) {
    exports.typeInfo.set(target, Reflect.getMetadata('design:paramtypes', target));
}
exports.getParams = getParams;
class Injector {
    constructor() {
        this.itemToProvider = new Map();
        _stored.set(this, new Map());
    }
    register(item, value) {
        /** Constructor */
        if (!value) {
            const create = () => {
                return this.construct(item);
            };
            this.itemToProvider.set(item, { get: create });
        }
        /** Factory */
        if (value && injector_type_1.isFactory(value)) {
            this.itemToProvider.set(item, { get: value.create });
        }
        /** Value */
        if (value) {
            const create = () => {
                return value;
            };
            this.itemToProvider.set(item, { get: create });
        }
    }
    resolve(item) {
        const provider = this.itemToProvider.get(item);
        return provider === null || provider === void 0 ? void 0 : provider.get();
    }
    construct(constructor) {
        const stored = __classPrivateFieldGet(this, _stored).get(constructor);
        if (stored) {
            return stored;
        }
        const paramsTypes = exports.typeInfo.get(constructor);
        const params = !!paramsTypes ? paramsTypes.map((item, index) => {
            const provider = this.itemToProvider.get(item);
            if (provider) {
                return provider.get();
            }
            else {
                // todo
            }
        }) : [];
        const instance = new constructor(...params);
        __classPrivateFieldGet(this, _stored).set(constructor, instance);
        return instance;
    }
}
exports.Injector = Injector;
_stored = new WeakMap();
Injector.shard = new Injector();
//# sourceMappingURL=injector.js.map