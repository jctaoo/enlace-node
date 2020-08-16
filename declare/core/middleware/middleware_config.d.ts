import { Middleware } from "./middleware";
export interface MiddlewareConfig {
    /**
     * The rules of use are the same as the endpoint.
     * @see EndpointConfigure.expectedPath
     */
    expectedPath: string;
}
export declare type MiddleWareWithConfigure = {
    configure: MiddlewareConfig;
    middleWare: Middleware;
};
export declare function MiddlewareConfig(obj: any): boolean;
