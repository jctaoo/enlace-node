"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareConfig = void 0;
function MiddlewareConfig(obj) {
    return typeof obj === "object" &&
        "expectedPath" in obj;
}
exports.MiddlewareConfig = MiddlewareConfig;
//# sourceMappingURL=middleware_config.js.map