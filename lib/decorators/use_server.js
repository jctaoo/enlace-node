"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useServer = void 0;
const core_1 = require("../core/");
exports.useServer = () => {
    return core_1.Injector.shard.resolve(core_1.EnlaceServer);
};
// todo
// export const Server: ParameterDecorator = () => {
//
// }
//# sourceMappingURL=use_server.js.map