import { EndpointConfig } from "../core/";
import "reflect-metadata";
import { ENDPOINT_CONFIG_KEY } from "./metadata_keys";

function ControllerMapping(config: EndpointConfig): ClassDecorator {
  return target => {
    Reflect.defineMetadata(ENDPOINT_CONFIG_KEY, config, target);
  };
}

export { ControllerMapping };