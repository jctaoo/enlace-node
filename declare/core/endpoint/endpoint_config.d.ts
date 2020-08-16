import { Adaptor } from "../adaptor";
import { Endpoint } from "./endpoint";
export interface EndpointConfig {
    /**
     * A path template to be matched with actual-path. Allow path parameters
     *  and wildcard. Examples:
     *
     *    - /pic
     *    - join-:(room_id) (using path parameters)
     *    - /pic/:(pic_name)/info (using path parameters)
     *    - /pic/id-*.png/ (using wildcard)
     *    - /pic/id-:(pic_id).png/* (using path parameters and wildcard)
     *
     * @see EndpointInput.pathParameters
     */
    expectedPath: string;
    /**
     * A callback function called by EnlaceServer gives Endpoint the ability to
     * dynamically select an adapter。
     */
    selectAdaptor: (adaptor: Adaptor) => boolean;
}
export declare type EndpointWithConfigure = {
    configure: EndpointConfig;
    endpoint: Endpoint;
};
export declare function isEndpointConfig(obj: any): boolean;
export declare function combineEndpointConfigure(lhs: EndpointConfig, rhs: EndpointConfig): EndpointConfig;
