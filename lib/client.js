"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const UUID = require("uuid");
const Http = require("http");
Http.createServer();
/**
 * Used to mark a unique network request instead of a unique user
 */
class Client {
    constructor(ip, id) {
        this.ip = ip;
        this.id = id;
    }
    static generate(ip) {
        const id = UUID.v4();
        return new Client(ip, id);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map