"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _isStarted;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnlaceServer = void 0;
const util_1 = require("../util/");
const router_1 = require("./router");
const observable_map_1 = require("../util/observable_map");
const injector_1 = require("./injector/");
class EnlaceServer {
    constructor() {
        _isStarted.set(this, false);
        /**
         * A map table store the relationship between adaptors and thier own configure.
         */
        this.adaptorsToConfigure = new observable_map_1.default();
        /**
         * Router instance contained in the EnlaceServer.
         */
        this.router = new router_1.Router(this);
    }
    get isStarted() {
        return __classPrivateFieldGet(this, _isStarted);
    }
    start() {
        __classPrivateFieldSet(this, _isStarted, true);
        for (const [adaptor, configure] of this.adaptorsToConfigure) {
            adaptor.attachOnServer(this, configure);
        }
    }
    /**
     * A list value indicates all the adaptors in the EnlaceServer.
     */
    get adaptors() {
        return [...this.adaptorsToConfigure.keys()];
    }
    /**
     * Register the given adaptor and it's own configure in the EnlaceServer.
     *
     * @param adaptor The adaptor to register.
     * @param configure The configure of the adaptor to register.
     */
    addAdaptorWithConfigure(adaptor, configure) {
        // register adaptor on injector
        injector_1.Injector.shard.register(adaptor);
        const instance = injector_1.Injector.shard.resolve(adaptor);
        // add adaptor on server
        if (__classPrivateFieldGet(this, _isStarted)) {
            instance.attachOnServer(this, configure);
        }
        instance.didReceiveContent = (content, client) => {
            this.receiveContent(instance, content, client).then();
        };
        this.adaptorsToConfigure.set(instance, configure);
        return instance;
    }
    /**
     * The callback function called by self when notified by a registered
     * adapter. @see Adaptor.didReceiveContent
     *
     * @param adaptor The adapter that notified the EnlaceServer.
     * @param input The package of the message from the client in the network
     *              request provided by the given adaptor.
     * @param client Used to mark unique network requests. Provided by the given
     *               adaptor.
     */
    receiveContent(adaptor, input, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = input.path;
            const middleWaresWithConfigure = this.getMiddlewaresWithPathAndAdaptor(path, adaptor);
            const endpointWithConfigure = this.getEndpointWithPathAndAdaptor(path, adaptor);
            this.executeMiddleWaresWithInput(middleWaresWithConfigure.map(mw => mw.middleWare), input);
            if (endpointWithConfigure) {
                const result = yield this.executeEndpointWithConfigure(endpointWithConfigure, path, input);
                if (result) {
                    adaptor.sendToClient(client, result);
                }
                else {
                    // todo 404
                }
            }
            else {
                // todo no matched endpoint
            }
        });
    }
    /**
     * Find all the suitable middleware in the EnlaceServer and given adaptor.
     *
     * @param path the actual-path
     * @param adaptor The adaptor to find middleware in it.
     */
    getMiddlewaresWithPathAndAdaptor(path, adaptor) {
        return [
            ...this.router.matchMiddleWareWithPath(path),
            ...adaptor.router.matchMiddleWareWithPath(path),
        ];
    }
    /**
     * Find all the suitable endpoints in the EnlaceServer and given adaptor.
     *
     * @param path the actual-path
     * @param adaptor The adaptor to find endpoints in it.
     */
    getEndpointWithPathAndAdaptor(path, adaptor) {
        let endpointWithConfigure;
        // match in EnalceServer
        const endpointWithConfigureInRoot = this.router.matchEndpointWithPath(path);
        if (endpointWithConfigureInRoot && endpointWithConfigureInRoot.configure.selectAdaptor(adaptor)) {
            endpointWithConfigure = endpointWithConfigureInRoot;
        }
        else {
            // match in given adaptor
            const endpointWithConfigureInAdaptor = adaptor.router.matchEndpointWithPath(path);
            endpointWithConfigure = endpointWithConfigureInAdaptor;
        }
        return endpointWithConfigure;
    }
    /**
     * Execute the given endpoint and return it's result. If the result of
     * given endpoint's execution is a Promise, this method will unwrap it.
     *
     * @param endpointWithConfigure The endpoint to execute and it's own configure.
     * @param path the actual-path
     * @param input The package of the message from the client in the network request.
     *              Will be passed into the given endpoint.
     * @returns The result of given endpoint's execution.
     */
    executeEndpointWithConfigure(endpointWithConfigure, path, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathParameters = util_1.Util.parsePath(path, endpointWithConfigure.configure.expectedPath);
            input.pathParameters = pathParameters;
            let result = endpointWithConfigure.endpoint.receive(input);
            if (result instanceof Promise) {
                result = yield result;
            }
            return result;
        });
    }
    /**
     * Use recursion to execute all the given middleware in turn.
     *
     * @param middleware The list value indicates all the middleware to execute.
     * @param input The package of the message from the client in the network request. Will be
     *              passed into each given middleware.
     */
    executeMiddleWaresWithInput(middleware, input) {
        if (middleware.length > 0) {
            const first = middleware[0];
            first(input, () => {
                this.executeMiddleWaresWithInput(middleware.splice(1), input);
            });
        }
    }
}
exports.EnlaceServer = EnlaceServer;
_isStarted = new WeakMap();
//# sourceMappingURL=server.js.map