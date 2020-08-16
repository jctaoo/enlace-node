import { GenericEndpointInput } from "./core/";
import { ClassEndpoint } from "./core/";

/**
 * Used to support network protocols that need to be returned
 * immediately after receiving a client request.
 */
export abstract class NormalEndpoint extends ClassEndpoint {

  /**
   * @see Endpoint.receive
   */
  abstract receive(input: GenericEndpointInput): any | Promise<any>;

}