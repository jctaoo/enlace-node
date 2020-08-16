"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApplication = void 0;
const index_1 = require("../core/index");
exports.useApplication = () => {
    return index_1.Injector.shard.resolve(index_1.Environment.shard.ApplicationKey);
};
//# sourceMappingURL=use_application.js.map