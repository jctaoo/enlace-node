import { Application, ApplicationConfig } from '../core/';
import ApplicationEventsMark from "./application_events_mark";
import "reflect-metadata";
export declare function MainApplication(config: ApplicationConfig): ClassDecorator;
export declare function MainApplication(target: Function): void;
export declare function getEventsMarkInApplication(application: Application): ApplicationEventsMark[];
