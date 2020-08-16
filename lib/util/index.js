"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const type_validation_1 = require("./type_validation");
const match_path_1 = require("./match_path");
const path_to_url_1 = require("./path_to_url");
exports.Util = {
    isJson: type_validation_1.isJson,
    isFunction: type_validation_1.isFunction,
    canBeConstructed: type_validation_1.canBeConstructed,
    matchPath: match_path_1.matchPath,
    parsePath: match_path_1.parsePath,
    pathToUrl: path_to_url_1.path_to_url,
};
__exportStar(require("./types"), exports);
__exportStar(require("./observable_map"), exports);
__exportStar(require("./log"), exports);
//# sourceMappingURL=index.js.map