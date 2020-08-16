"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePath = exports.matchPath = void 0;
function matchPath(path, expectedPath) {
    expectedPath = expectedPath.replace(/\*/g, ".*");
    const regxToValidate = RegExp(expectedPath.replace(/:\([^)].+?\)/g, ".*"));
    const result = regxToValidate.exec(path);
    if (result) {
        return result[0] === path;
    }
    else {
        return false;
    }
}
exports.matchPath = matchPath;
function parsePath(path, expectedPath) {
    var _a, _b;
    expectedPath = expectedPath.replace(/\*/g, ".*");
    const parameters = {};
    const regxToExtractParameters = RegExp(expectedPath.replace(/:\([^)].+?\)/g, ":\\((.+)\\)"));
    const regxToExtractArguments = RegExp(expectedPath.replace(/:\([^)].+?\)/g, "(.+)"));
    const extractedParameters = (_a = expectedPath.match(regxToExtractParameters)) === null || _a === void 0 ? void 0 : _a.slice(1);
    const extractedArguments = (_b = path.match(regxToExtractArguments)) === null || _b === void 0 ? void 0 : _b.slice(1);
    if (extractedParameters && extractedArguments) {
        extractedParameters.forEach((name, index) => parameters[name] = extractedArguments[index]);
    }
    return parameters;
}
exports.parsePath = parsePath;
//# sourceMappingURL=match_path.js.map