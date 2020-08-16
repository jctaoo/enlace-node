import { EnlaceServer } from "./server";
import { Application } from "./application/";
export declare class Environment {
    ApplicationKey: symbol;
    static shard: Environment;
    server: EnlaceServer;
    private app;
    private isReady;
    private adaptorToObserver;
    private initApp;
    scan(): Promise<void>;
    run(app: Application): Promise<void>;
    private callAdaptorObserver;
    private registerServer;
    private registerApplication;
    private setEventsInAdaptor;
}
