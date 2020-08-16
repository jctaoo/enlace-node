"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointsInController = exports.isController = void 0;
const core_1 = require("./core");
const util_1 = require("./util/");
require("reflect-metadata");
const decorators_1 = require("./decorators/");
// todo 考虑要不要加上这个东西
// abstract class Controller {
//
// }
function isController(controller) {
    return !!Reflect.getMetadata(decorators_1.ENDPOINT_CONFIG_KEY, controller) ||
        !!Reflect.getMetadata(decorators_1.ENDPOINT_CONFIG_KEY, controller.constructor);
}
exports.isController = isController;
function getEndpointsInController(controller) {
    const rootConfigure = Reflect.getMetadata(decorators_1.ENDPOINT_CONFIG_KEY, controller.constructor);
    const prototype = Object.getPrototypeOf(controller);
    const methodName = Object.getOwnPropertyNames(prototype)
        .filter(item => util_1.Util.isFunction(prototype[item]) && !util_1.Util.canBeConstructed(prototype[item]));
    return methodName.map(method => {
        const fn = prototype[method];
        const configure = Reflect.getMetadata(decorators_1.ENDPOINT_CONFIG_KEY, fn);
        return {
            configure: core_1.combineEndpointConfigure(rootConfigure, configure),
            endpoint: core_1.toEndpoint(fn)
        };
    });
}
exports.getEndpointsInController = getEndpointsInController;
//# sourceMappingURL=controller.js.map