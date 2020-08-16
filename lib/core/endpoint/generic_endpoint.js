"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEndpoint = exports.ClassEndpoint = void 0;
const endpoint_1 = require("./endpoint");
require("reflect-metadata");
const decorators_1 = require("../../decorators/");
const endpoint_config_1 = require("./endpoint_config");
const util_1 = require("../../util/");
let __useArrowFunction;
/**
 * Class style Endpoint.
 * @see Endpoint
 */
class ClassEndpoint {
}
exports.ClassEndpoint = ClassEndpoint;
function toEndpoint(endpoint) {
    // instance of ClassEndpoint
    if (endpoint instanceof ClassEndpoint) {
        return endpoint;
    }
    // constructor of ClassEndpoint
    const config = Reflect.getMetadata(decorators_1.ENDPOINT_CONFIG_KEY, endpoint);
    if (config && endpoint_config_1.isEndpointConfig(config)) {
        return new endpoint();
    }
    // Endpoint interface
    if (endpoint_1.isEndpoint(endpoint)) {
        return endpoint;
    }
    // function endpoint
    if (__useArrowFunction === undefined) {
        if (util_1.Util.canBeConstructed(endpoint)) {
            // use function name() { ... }
            __useArrowFunction = false;
        }
        else {
            // use name() => { ... }
            __useArrowFunction = false;
        }
    }
    else {
        if (util_1.Util.canBeConstructed(endpoint) && __useArrowFunction) {
            util_1.Log.warning("We recommend that you do not use the arrow function " +
                "and es5 function at the same time in the project");
        }
    }
    return { receive: endpoint };
}
exports.toEndpoint = toEndpoint;
//# sourceMappingURL=generic_endpoint.js.map