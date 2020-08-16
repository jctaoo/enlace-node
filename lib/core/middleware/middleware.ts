import { GenericEndpointInput } from "../endpoint/";

export type Middleware = (input: GenericEndpointInput, next: Function) => void | Promise<void>;