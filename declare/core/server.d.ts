import { Adaptor, AdaptorConfig } from "./adaptor/";
import { EndpointWithConfigure } from "./endpoint";
import { Constructor } from "../util/";
import { MiddleWareWithConfigure, Middleware } from "./middleware";
import { GenericEndpointInput } from "./endpoint/";
import { Client } from "../client";
import { Router } from "./router";
import ObservableMap from "../util/observable_map";
export declare class EnlaceServer {
    #private;
    get isStarted(): boolean;
    start(): void;
    /**
     * A map table store the relationship between adaptors and thier own configure.
     */
    readonly adaptorsToConfigure: ObservableMap<Adaptor, AdaptorConfig>;
    /**
     * Router instance contained in the EnlaceServer.
     */
    readonly router: Router;
    /**
     * A list value indicates all the adaptors in the EnlaceServer.
     */
    protected get adaptors(): Adaptor[];
    /**
     * Register the given adaptor and it's own configure in the EnlaceServer.
     *
     * @param adaptor The adaptor to register.
     * @param configure The configure of the adaptor to register.
     */
    addAdaptorWithConfigure(adaptor: Constructor<Adaptor>, configure: AdaptorConfig): Adaptor;
    /**
     * The callback function called by self when notified by a registered
     * adapter. @see Adaptor.didReceiveContent
     *
     * @param adaptor The adapter that notified the EnlaceServer.
     * @param input The package of the message from the client in the network
     *              request provided by the given adaptor.
     * @param client Used to mark unique network requests. Provided by the given
     *               adaptor.
     */
    protected receiveContent(adaptor: Adaptor, input: GenericEndpointInput, client: Client): Promise<void>;
    /**
     * Find all the suitable middleware in the EnlaceServer and given adaptor.
     *
     * @param path the actual-path
     * @param adaptor The adaptor to find middleware in it.
     */
    protected getMiddlewaresWithPathAndAdaptor(path: string, adaptor: Adaptor): MiddleWareWithConfigure[];
    /**
     * Find all the suitable endpoints in the EnlaceServer and given adaptor.
     *
     * @param path the actual-path
     * @param adaptor The adaptor to find endpoints in it.
     */
    protected getEndpointWithPathAndAdaptor(path: string, adaptor: Adaptor): EndpointWithConfigure | null;
    /**
     * Execute the given endpoint and return it's result. If the result of
     * given endpoint's execution is a Promise, this method will unwrap it.
     *
     * @param endpointWithConfigure The endpoint to execute and it's own configure.
     * @param path the actual-path
     * @param input The package of the message from the client in the network request.
     *              Will be passed into the given endpoint.
     * @returns The result of given endpoint's execution.
     */
    protected executeEndpointWithConfigure(endpointWithConfigure: EndpointWithConfigure, path: string, input: GenericEndpointInput): Promise<any>;
    /**
     * Use recursion to execute all the given middleware in turn.
     *
     * @param middleware The list value indicates all the middleware to execute.
     * @param input The package of the message from the client in the network request. Will be
     *              passed into each given middleware.
     */
    protected executeMiddleWaresWithInput(middleware: Middleware[], input: GenericEndpointInput): void;
}
