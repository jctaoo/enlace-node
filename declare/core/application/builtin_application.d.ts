import { Injector } from "../injector/injector";
import { EnlaceServer } from "../server";
import { Application } from "./application";
import { ApplicationConfig } from "./application_config";
export declare class EnlaceApplication extends Application {
    protected _configure: (injector: Injector, server: EnlaceServer) => void;
    config: ApplicationConfig;
    onStart: () => void;
    constructor(_configure?: (injector: Injector, server: EnlaceServer) => void, config?: ApplicationConfig);
    onStartUp(): void;
    configure(injector: Injector, server: EnlaceServer): void | Promise<void>;
}
