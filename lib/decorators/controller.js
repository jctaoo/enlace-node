"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerMapping = void 0;
require("reflect-metadata");
const metadata_keys_1 = require("./metadata_keys");
function ControllerMapping(config) {
    return target => {
        Reflect.defineMetadata(metadata_keys_1.ENDPOINT_CONFIG_KEY, config, target);
    };
}
exports.ControllerMapping = ControllerMapping;
//# sourceMappingURL=controller.js.map