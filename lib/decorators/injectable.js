"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectable = void 0;
const core_1 = require("../core/");
exports.injectable = (target) => {
    core_1.getParams(target);
};
//# sourceMappingURL=injectable.js.map