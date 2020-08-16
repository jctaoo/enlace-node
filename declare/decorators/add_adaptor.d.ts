import { Adaptor, AdaptorConfig } from "../core/";
import ApplicationEventsMark from "./application_events_mark";
import "reflect-metadata";
import { Constructor } from "../util/";
export declare type AddAdaptorApplicationEventMark = ApplicationEventsMark<Adaptor>;
export declare function AddAdaptor(adaptorConstructor: Constructor<Adaptor>, configure?: AdaptorConfig): MethodDecorator;
