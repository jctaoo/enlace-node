"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
require("reflect-metadata");
const metadata_keys_1 = require("./metadata_keys");
function Endpoint(config) {
    return (...args) => {
        // class decorator
        if (args.length === 1) {
            const target = args[0];
            Reflect.defineMetadata(metadata_keys_1.ENDPOINT_CONFIG_KEY, config, target);
        }
        // method decorator
        if (args.length > 1) {
            const des = args[2];
            Reflect.defineMetadata(metadata_keys_1.ENDPOINT_CONFIG_KEY, config, des.value);
        }
    };
}
exports.Endpoint = Endpoint;
//# sourceMappingURL=endpoint.js.map