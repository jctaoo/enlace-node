import {
  EndpointWithConfigure,
  toEndpoint,
  combineEndpointConfigure,
} from "./core";
import { Constructor, Util } from "./util/";
import "reflect-metadata";
import { ENDPOINT_CONFIG_KEY } from "./decorators/";

// todo 考虑要不要加上这个东西
// abstract class Controller {
//
// }

export function isController(controller: Object | Constructor<Object>): boolean {
  return !!Reflect.getMetadata(ENDPOINT_CONFIG_KEY, controller) ||
    !!Reflect.getMetadata(ENDPOINT_CONFIG_KEY, controller.constructor);
}

export function getEndpointsInController(controller: Object): EndpointWithConfigure[] {
  const rootConfigure = Reflect.getMetadata(ENDPOINT_CONFIG_KEY, controller.constructor);

  const prototype = Object.getPrototypeOf(controller);
  const methodName = Object.getOwnPropertyNames(prototype)
    .filter(item => Util.isFunction(prototype[item]) && !Util.canBeConstructed(prototype[item]));

  return methodName.map(method => {
    const fn = prototype[method];
    const configure = Reflect.getMetadata(ENDPOINT_CONFIG_KEY, fn);
    return {
      configure: combineEndpointConfigure(rootConfigure, configure),
      endpoint: toEndpoint(fn)
    };
  });
}
