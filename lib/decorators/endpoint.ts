import { EndpointConfig } from "../core/";
import "reflect-metadata";
import { ENDPOINT_CONFIG_KEY } from "./metadata_keys";
import { Constructor } from "../util/";

export function Endpoint(config: EndpointConfig): MethodDecorator;
export function Endpoint(config: EndpointConfig): ClassDecorator;
export function Endpoint(config: EndpointConfig): MethodDecorator | ClassDecorator {
  return (...args: any[]) => {
    // class decorator
    if (args.length === 1) {
      const target: Constructor<unknown> = args[0];
      Reflect.defineMetadata(ENDPOINT_CONFIG_KEY, config, target);
    }

    // method decorator
    if (args.length > 1) {
      const des: TypedPropertyDescriptor<unknown> = args[2];
      Reflect.defineMetadata(ENDPOINT_CONFIG_KEY, config, des.value);
    }
  }
}