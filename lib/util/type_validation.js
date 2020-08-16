"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJson = exports.isFunction = exports.canBeConstructed = void 0;
function canBeConstructed(fn) {
    try {
        new fn();
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.canBeConstructed = canBeConstructed;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isJson(obj) {
    try {
        return JSON.parse(obj);
    }
    catch (_a) {
        return false;
    }
}
exports.isJson = isJson;
//# sourceMappingURL=type_validation.js.map