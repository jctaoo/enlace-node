import { GenericEndpointInput } from "./endpoint_input";
/**
 * Describe the parameters and behavior of the endpoint regardless of whether
 * the form of the endpoint is a function or a class.
 */
export interface Endpoint {
    /**
     * A callback function called by EnlaceServer when the request from the client matches
     * the configuration of this endpoint.
     *
     * @param input package of the message from the client in the network request.
     */
    receive(input: GenericEndpointInput): any | Promise<any>;
}
export declare function isEndpoint(obj: any): boolean;
