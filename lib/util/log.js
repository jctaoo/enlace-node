"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class Log {
    static clear() {
        console.clear();
    }
    static info(message, tag = "") {
        const coloredTag = chalk_1.yellow(chalk_1.bold(`[${tag}]  `));
        const coloredMessage = chalk_1.white(message);
        console.log((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
    }
    static success(message, tag = "") {
        const coloredTag = chalk_1.yellow(chalk_1.bold(`[${tag}]  `));
        const coloredMessage = chalk_1.green(chalk_1.bold(message));
        console.log((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
    }
    static warning(message, tag = "") {
        const coloredTag = chalk_1.yellow(chalk_1.bold(`[${tag}]  `));
        const coloredMessage = chalk_1.yellow(chalk_1.bold(message));
        console.log((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
    }
    static error(message, tag = "") {
        const coloredTag = chalk_1.yellow(chalk_1.bold(`[${tag}]  `));
        const coloredMessage = chalk_1.red(chalk_1.bold(message));
        console.error((coloredTag ? `${tag === "" ? "" : coloredTag}` : "") + coloredMessage);
    }
}
exports.default = Log;
//# sourceMappingURL=log.js.map