"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApplicationConfig = void 0;
function isApplicationConfig(obj) {
    return typeof obj === "object" &&
        "scan" in obj;
}
exports.isApplicationConfig = isApplicationConfig;
//# sourceMappingURL=application_config.js.map