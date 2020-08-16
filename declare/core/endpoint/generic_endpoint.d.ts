import { Endpoint } from "./endpoint";
import { GenericEndpointInput } from "./endpoint_input";
import "reflect-metadata";
import { Constructor } from "../../util/";
/**
 * Class style Endpoint.
 * @see Endpoint
 */
export declare abstract class ClassEndpoint implements Endpoint {
    /**
     * @see Endpoint.receive
     */
    abstract receive(input: GenericEndpointInput): any | Promise<any>;
}
/**
 * Function style Endpoint.
 * @see Endpoint
 * @see Endpoint.receive
 */
export declare type FunctionEndpoint = (input: any) => any | Promise<any>;
/**
 * Used when the form (class or function) of the endpoint is unknown.
 */
export declare type GenericEndpoint = Constructor<ClassEndpoint> | Endpoint | FunctionEndpoint;
export declare function toEndpoint(endpoint: GenericEndpoint): Endpoint;
