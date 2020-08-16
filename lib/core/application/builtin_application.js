"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnlaceApplication = void 0;
const constant_1 = require("../../constant");
const application_1 = require("./application");
// todo 重新设计
class EnlaceApplication extends application_1.Application {
    constructor(_configure = () => {
    }, config = constant_1.DEFAULT_APP_CONFIG) {
        super(config);
        this._configure = _configure;
        this.config = config;
        this.onStart = () => {
        };
    }
    onStartUp() {
        this.onStart();
    }
    configure(injector, server) {
        super.configure(injector, server);
        this._configure(injector, server);
    }
}
exports.EnlaceApplication = EnlaceApplication;
//# sourceMappingURL=builtin_application.js.map