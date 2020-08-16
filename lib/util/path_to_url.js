"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path_to_url = void 0;
exports.path_to_url = (header, url) => {
    return new URL(
    // TODO always http, solve https
    url, `http://${header.host}`);
};
//# sourceMappingURL=path_to_url.js.map