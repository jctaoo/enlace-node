import { Application } from "../core/";
import { Injector } from "../core/";
import { Environment } from "../core/";
import { Adaptor } from "../core/";
import { Constructor } from "../util/";

export const useAdaptor = <T extends Adaptor>(constructor: Constructor<T>): T => {
  return Injector.shard.resolve(constructor);
}