import { GenericEndpointInput } from "../endpoint/";
export declare type Middleware = (input: GenericEndpointInput, next: Function) => void | Promise<void>;
