"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdaptor = void 0;
const core_1 = require("../core/");
exports.useAdaptor = (constructor) => {
    return core_1.Injector.shard.resolve(constructor);
};
//# sourceMappingURL=use_adaptor.js.map