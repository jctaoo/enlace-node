import {
  Adaptor,
  AdaptorConfig,
  Environment,
  getParams,
  Injector
} from "../core/";
import ApplicationEventsMark from "./application_events_mark";
import ApplicationEvents from "../application_events";
import "reflect-metadata";
import { APPLICATION_EVENTS_MARK_KEY } from "./metadata_keys";
import { Constructor, Log } from "../util/";
import { DEFAULT_ADAPTOR_CONFIG } from "../constant";
import { useServer } from "./use_server";

// todo do not use Constructor
// todo default AdaptorConfigure
// todo 与application configure的顺序

export type AddAdaptorApplicationEventMark = ApplicationEventsMark<Adaptor>;

export function AddAdaptor(adaptorConstructor: Constructor<Adaptor>, configure: AdaptorConfig = DEFAULT_ADAPTOR_CONFIG): MethodDecorator {
  const adaptor = useServer().addAdaptorWithConfigure(adaptorConstructor, configure);
  return (target, propertyKey, descriptor) => {
    // todo 考虑直接获取的api
    // const type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[0]
    // console.log(Injector.shard.resolve(type));
    const defaultTarget = function() {
      Log.error("no target found.")
    }
    // todo
    const mark: AddAdaptorApplicationEventMark = {
      type: ApplicationEvents.onAddAdaptor,
      meta: adaptor,
      target: <Function>(descriptor.value ?? defaultTarget),
    }
    Reflect.defineMetadata(APPLICATION_EVENTS_MARK_KEY, mark, descriptor.value);
  };
}