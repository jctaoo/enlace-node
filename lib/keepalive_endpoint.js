"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeepAliveEndpoint = void 0;
const core_1 = require("./core/");
class KeepAliveEndpoint extends core_1.ClassEndpoint {
    constructor() {
        super(...arguments);
        /**
         * A list value indicates all the clients connected with this endpoint.
         */
        this.clients = [];
    }
    // todo lifecycle callback
    // requesterDidOffline(): void {};
    // requesterDidOnline(): void {};
    /**
     * Send a message to a given two or more clients connected with this endpoint.
     *
     * @param message The message to send to clients.
     * @param clients The list value indicates destinations of the message.
     */
    broadcast(message, clients = this.clients) {
        for (const requester of clients) {
            this.sendMessageToClient(message, requester);
        }
    }
}
exports.KeepAliveEndpoint = KeepAliveEndpoint;
//# sourceMappingURL=keepalive_endpoint.js.map