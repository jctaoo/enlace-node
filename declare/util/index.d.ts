/// <reference types="node" />
import { isJson, isFunction, canBeConstructed } from "./type_validation";
import { matchPath, parsePath } from "./match_path";
export declare const Util: {
    isJson: typeof isJson;
    isFunction: typeof isFunction;
    canBeConstructed: typeof canBeConstructed;
    matchPath: typeof matchPath;
    parsePath: typeof parsePath;
    pathToUrl: (header: import("http").IncomingHttpHeaders, url: string) => URL;
};
export * from "./types";
export * from "./observable_map";
export * from "./log";
