import {
  Application,
  ApplicationConfig,
  isApplicationConfig,
  Environment,
} from '../core/';
import ApplicationEventsMark from "./application_events_mark";
import "reflect-metadata"
import { APPLICATION_EVENTS_MARK_KEY } from "./metadata_keys";
import { Constructor, Util } from "../util/";
import { injectable } from "./injectable";

export function MainApplication(config: ApplicationConfig): ClassDecorator;
export function MainApplication(target: Function): void;
export function MainApplication(arg: any): any {
  const fn = (target: Constructor<Application>, config?: ApplicationConfig) => {
    // combine injectable
    // todo better way
    injectable(target);
    // todo check Application
    Environment.shard.run(new target(config)).then();
  }
  if (isApplicationConfig(arg)) {
    return fn
  }
  fn(arg);
}

export function getEventsMarkInApplication(application: Application): ApplicationEventsMark[] {
  const prototype = Object.getPrototypeOf(application);
  const methodName = Object.getOwnPropertyNames(prototype)
    .filter(item => Util.isFunction(prototype[item]) && !Util.canBeConstructed(prototype[item]));

  return methodName.map(method => {
    const fn = prototype[method];
    const configure: ApplicationEventsMark = Reflect.getMetadata(APPLICATION_EVENTS_MARK_KEY, fn);
    return configure;
  }).filter(i => i)
  // todo 关于去重复，参考swift里的compactMap
}




