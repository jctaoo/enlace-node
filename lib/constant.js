"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MIDDLEWARE_CONFIG = exports.DEFAULT_ENDPOINT_CONFIG = exports.DEFAULT_ADAPTOR_CONFIG = exports.DEFAULT_APP_CONFIG = exports.WELCOME_WORDS = exports.PROJECT_NAME = exports.LOGO = exports.DEFAULT_HOST = exports.DEFAULT_PORT = void 0;
const util_1 = require("./util");
exports.DEFAULT_PORT = 20203;
exports.DEFAULT_HOST = "localhost";
exports.LOGO = "\t" + "  ___  ____  / /___ _________ " + "\n" +
    "\t" + " / _ \\/ __ \\/ / __ `/ ___/ _ \\" + "\n" +
    "\t" + "/  __/ / / / / /_/ / /__/  __/" + "\n" +
    "\t" + "\\___/_/ /_/_/\\__,_/\\___/\\___/ " + "\n";
exports.PROJECT_NAME = 'enlace';
exports.WELCOME_WORDS = "starting...\n";
exports.DEFAULT_APP_CONFIG = {
    scan: false,
};
exports.DEFAULT_ADAPTOR_CONFIG = {
    host: exports.DEFAULT_HOST,
    port: exports.DEFAULT_PORT,
};
exports.DEFAULT_ENDPOINT_CONFIG = {
    expectedPath: "*",
    selectAdaptor: util_1.TrueFunction,
};
exports.DEFAULT_MIDDLEWARE_CONFIG = {
    expectedPath: "*",
};
//# sourceMappingURL=constant.js.map