import { Endpoint, EndpointConfig, GenericEndpoint, EndpointWithConfigure } from "./endpoint";
import { MiddlewareConfig, Middleware, MiddleWareWithConfigure } from "./middleware";
import { EnlaceServer } from "./server";
import { Adaptor } from "./adaptor";
declare type RouterHolder = EnlaceServer | Adaptor;
declare type RouteItem = GenericEndpoint | Object;
/**
 * Function module that guides network requests to the correct Endpoint.
 */
export declare class Router {
    /**
     * The owner of the Router. It's might be an instance of EnlceServer
     * or Adaptor.
     */
    readonly holder: RouterHolder;
    constructor(holder: RouterHolder);
    /**
     * A boolean value indicates whether the router is on the EnlceServer
     * instance.
     */
    get isRootRouter(): boolean;
    /**
     * A map table store the relationship between endpoint configure and regisetered endpoint.
     */
    protected configureToEndpoint: Map<EndpointConfig, Endpoint>;
    /**
     * A list value store the relationship between endpoint configure and registered middle ware.
     */
    protected middlewareWithConfigure: Array<MiddleWareWithConfigure>;
    /**
     * A list value indicates all the registered endpoints in the Router.
     */
    get endpoints(): Endpoint[];
    /**
     * A list value indicates all the registered middlewares in the Router.
     */
    get middleware(): Middleware[];
    /**
     * Register the given middleware on the expected path.
     *
     * @param path The expected path of the middleware. (@see EndpointConfigure.expectedPath)
     * @param middleware The middleware to register.
     */
    useMiddlewareOn(path: string, middleware: Middleware): void;
    /**
     * Register the given endpoint on the expected path.
     * @see Router.useEndpoint
     *
     * @param path The expected path of the endpoint. (@see EndpointConfigure.expectedPath)
     * @param endpoint The endpoint to register.
     */
    useEndpointOn(path: string, endpoint: RouteItem): Router;
    /**
     * The general method to register a endpoint or a controller on the router.
     * If the endpoint parameter is passed into a controller, all configure of
     * endpoints in the controller will in inherit the configure parameter.
     * Otherwise, the configure parameter must be passed into.
     *
     * @param endpoint The endpoint to register.
     * @param configure The configure of endpoint.
     */
    useEndpoint(endpoint: RouteItem, configure?: EndpointConfig): Router;
    /**
     * Match the given actual-path with all the expected-path in middleware's
     * configuration to find out all the suitable middleware to call.
     *
     * @param path the actual-path
     */
    matchMiddleWareWithPath(path: string): MiddleWareWithConfigure[];
    /**
     * Match the given actual-path with all the expected-path in endpoints'
     * configure to find out the most suitable endpoint to call.
     *
     * @param path the actual-path
     */
    matchEndpointWithPath(path: string): EndpointWithConfigure | null;
    /**
     * General method for registering endpoints.
     *
     * @param endpoint The endpoint to register.
     * @param config The config of endpoint to register.
     */
    protected addEndpointWithConfigure(endpoint: Endpoint, config: EndpointConfig): void;
    /**
     * General method for registering middleware.
     *
     * @param middleware The middleware to register.
     * @param configure The configure of middleware to register.
     */
    protected addMiddleWareAndConfigure(middleware: Middleware, configure: MiddlewareConfig): void;
}
export {};
