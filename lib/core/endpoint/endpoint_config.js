"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineEndpointConfigure = exports.isEndpointConfig = void 0;
function isEndpointConfig(obj) {
    return typeof obj === "object" &&
        "expectedPath" in obj &&
        "selectAdaptor" in obj;
}
exports.isEndpointConfig = isEndpointConfig;
function combineEndpointConfigure(lhs, rhs) {
    if (lhs.expectedPath.endsWith('/')) {
        lhs.expectedPath = lhs.expectedPath.slice(0, lhs.expectedPath.length - 1);
    }
    const expectedPath = lhs.expectedPath + rhs.expectedPath;
    const selectAdaptor = rhs.selectAdaptor;
    return { expectedPath, selectAdaptor };
}
exports.combineEndpointConfigure = combineEndpointConfigure;
//# sourceMappingURL=endpoint_config.js.map