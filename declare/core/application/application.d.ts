import { Injector } from "../injector/injector";
import { EnlaceServer } from "../server";
import { ApplicationConfig } from "./application_config";
export declare abstract class Application {
    config: ApplicationConfig;
    protected constructor(config?: ApplicationConfig);
    onStartUp(): void | Promise<void>;
    configure(injector: Injector, server: EnlaceServer): void | Promise<void>;
}
