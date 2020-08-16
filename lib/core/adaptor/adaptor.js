"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adaptor = void 0;
const router_1 = require("../router");
class Adaptor {
    constructor() {
        /**
         * Router instance contained in the adapter.
         */
        this.router = new router_1.Router(this);
        /**
         * A map table store the relationship between clients and their own input.
         * Subclasses need to maintain themselves.
         */
        this.clientToInput = new Map();
        /**
         * The callback function provided by EnlaceServer to notify the
         * EnlaceServer that a new request has arrived.The normal practice
         * is to call the callback function when the Adaptor receives a
         * network request.
         *
         * @param input package of the message from the client in the network request.
         * @param client where the network request from.
         */
        this.didReceiveContent = () => { };
    }
    get isAssociatedWithServer() {
        // todo
        return true;
    }
    /**
     * The method to establish contact with EnlaceServer and start custom
     * network request monitoring behavior.
     *
     * Note: This method must be implemented by an adapter of a specific
     * network protocol even if it isn't an abstract method. Otherwise,
     * the adaptor cannot work as expected.
     *
     * @param server
     * @param config
     */
    attachOnServer(server, config) {
        this.config = config;
    }
    /**
     * Life cycle callback called when the adapter is already on the
     * server and starts listening for requests. Called by EnlaceServer.
     */
    onStart() { }
    /**
     * Life cycle callback called when the adapter has stopped listening
     * for requests or is no longer associated with any server. Called by
     * EnlaceServer.
     */
    onDispose() { }
}
exports.Adaptor = Adaptor;
/**
 * A string value indicates network protocol of this Adaptor. (like 'HTTP/1.1')
 */
Adaptor.protocol = 'None';
//# sourceMappingURL=adaptor.js.map