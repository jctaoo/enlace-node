"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const endpoint_1 = require("./endpoint");
const util_1 = require("../util/");
const chalk_1 = require("chalk");
const server_1 = require("./server");
const controller_1 = require("../controller");
/**
 * Function module that guides network requests to the correct Endpoint.
 */
class Router {
    constructor(holder) {
        /**
         * A map table store the relationship between endpoint configure and regisetered endpoint.
         */
        this.configureToEndpoint = new Map();
        /**
         * A list value store the relationship between endpoint configure and registered middle ware.
         */
        this.middlewareWithConfigure = new Array();
        this.holder = holder;
    }
    /**
     * A boolean value indicates whether the router is on the EnlceServer
     * instance.
     */
    get isRootRouter() {
        return this.holder instanceof server_1.EnlaceServer;
    }
    /**
     * A list value indicates all the registered endpoints in the Router.
     */
    get endpoints() {
        return [...this.configureToEndpoint.values()];
    }
    /**
     * A list value indicates all the registered middlewares in the Router.
     */
    get middleware() {
        return this.middlewareWithConfigure.map(i => i.middleWare);
    }
    /**
     * Register the given middleware on the expected path.
     *
     * @param path The expected path of the middleware. (@see EndpointConfigure.expectedPath)
     * @param middleware The middleware to register.
     */
    useMiddlewareOn(path, middleware) {
        const configure = {
            expectedPath: path
        };
        this.addMiddleWareAndConfigure(middleware, configure);
    }
    /**
     * Register the given endpoint on the expected path.
     * @see Router.useEndpoint
     *
     * @param path The expected path of the endpoint. (@see EndpointConfigure.expectedPath)
     * @param endpoint The endpoint to register.
     */
    useEndpointOn(path, endpoint) {
        return this.useEndpoint(endpoint, { expectedPath: path, selectAdaptor: util_1.TrueFunction });
    }
    /**
     * The general method to register a endpoint or a controller on the router.
     * If the endpoint parameter is passed into a controller, all configure of
     * endpoints in the controller will in inherit the configure parameter.
     * Otherwise, the configure parameter must be passed into.
     *
     * @param endpoint The endpoint to register.
     * @param configure The configure of endpoint.
     */
    useEndpoint(endpoint, configure) {
        if (controller_1.isController(endpoint)) {
            const endpoints = controller_1.getEndpointsInController(endpoint);
            for (const { endpoint, configure } of endpoints) {
                this.addEndpointWithConfigure(endpoint_1.toEndpoint(endpoint), configure);
            }
        }
        else {
            // todo waring if the configure is not be passed into.
            this.addEndpointWithConfigure(endpoint_1.toEndpoint(endpoint), configure);
        }
        return this;
    }
    /**
     * Match the given actual-path with all the expected-path in middleware's
     * configuration to find out all the suitable middleware to call.
     *
     * @param path the actual-path
     */
    matchMiddleWareWithPath(path) {
        let matched = [];
        for (const { configure, middleWare } of this.middlewareWithConfigure) {
            if (util_1.Util.matchPath(path, configure.expectedPath)) {
                matched.push({ configure, middleWare });
            }
        }
        return matched;
    }
    /**
     * Match the given actual-path with all the expected-path in endpoints'
     * configure to find out the most suitable endpoint to call.
     *
     * @param path the actual-path
     */
    matchEndpointWithPath(path) {
        var _a;
        let matched = null;
        for (const [configure, endpoint] of this.configureToEndpoint) {
            if (util_1.Util.matchPath(path, configure.expectedPath)) {
                if (configure.expectedPath.length >
                    ((_a = matched === null || matched === void 0 ? void 0 : matched.configure.expectedPath.length) !== null && _a !== void 0 ? _a : 0)) {
                    matched = { configure, endpoint };
                }
            }
        }
        return matched;
    }
    /**
     * General method for registering endpoints.
     *
     * @param endpoint The endpoint to register.
     * @param config The config of endpoint to register.
     */
    addEndpointWithConfigure(endpoint, config) {
        util_1.Log.info(`register ${chalk_1.hex("#FFC42E")(config.expectedPath)} on endpoint`, 'Router');
        this.configureToEndpoint.set(config, endpoint);
    }
    /**
     * General method for registering middleware.
     *
     * @param middleware The middleware to register.
     * @param configure The configure of middleware to register.
     */
    addMiddleWareAndConfigure(middleware, configure) {
        this.middlewareWithConfigure.push({ configure, middleWare: middleware });
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map