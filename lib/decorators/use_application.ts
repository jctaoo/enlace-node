import { Application, Injector, Environment } from "../core/index";

export const useApplication = <T extends Application>(): T => {
  return Injector.shard.resolve(Environment.shard.ApplicationKey);
}