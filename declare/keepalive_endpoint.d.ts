import { ClassEndpoint } from "./core/";
import { GenericEndpointInput } from "./core/";
import { Client } from "./client";
export declare abstract class KeepAliveEndpoint extends ClassEndpoint {
    /**
     * A list value indicates all the clients connected with this endpoint.
     */
    clients: Client[];
    /**
     * @see Endpoint.receive
     */
    abstract receive(input: GenericEndpointInput): void;
    /**
     * Send a message to a given two or more clients connected with this endpoint.
     *
     * @param message The message to send to clients.
     * @param clients The list value indicates destinations of the message.
     */
    broadcast(message: unknown, clients?: Client[]): void;
    /**
     * Send message to given client connected with this endpoint.
     *
     * Note: Because of the limit of typescript, we cannot use generics
     * to implement sendMessageToClient method. you can use with similar
     * code to implement sendMessageToClient method:
     *
     *  ```
     *      const adaptor = this.server.getAdaptor(AdaptorType);
     *      adaptor?.sendToClient(client, message);
     *  ```
     *
     * @param message The message to send to the client.
     * @param client The destination of the message.
     */
    abstract sendMessageToClient(message: unknown, client: Client): void;
}
