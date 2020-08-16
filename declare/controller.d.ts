import { EndpointWithConfigure } from "./core";
import { Constructor } from "./util/";
import "reflect-metadata";
export declare function isController(controller: Object | Constructor<Object>): boolean;
export declare function getEndpointsInController(controller: Object): EndpointWithConfigure[];
