"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const constant_1 = require("../../constant");
class Application {
    constructor(config = constant_1.DEFAULT_APP_CONFIG) {
        this.config = config;
    }
    onStartUp() {
        // todo pass
    }
    configure(injector, server) {
        // todo pass
    }
}
exports.Application = Application;
//# sourceMappingURL=application.js.map