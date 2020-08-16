import { isJson, isFunction, canBeConstructed } from "./type_validation";
import { matchPath, parsePath } from "./match_path";
import { path_to_url } from "./path_to_url";

export const Util = {
  isJson,
  isFunction,
  canBeConstructed,
  matchPath,
  parsePath,
  pathToUrl: path_to_url,
};

export * from "./types";
export * from "./observable_map";
export * from "./log";