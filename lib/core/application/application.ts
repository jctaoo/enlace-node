import { DEFAULT_APP_CONFIG } from "../../constant";
import { Injector } from "../injector/injector";
import { EnlaceServer } from "../server";
import { ApplicationConfig } from "./application_config";

export abstract class Application {

  protected constructor(
    public config: ApplicationConfig = DEFAULT_APP_CONFIG
  ) {
  }

  onStartUp(): void | Promise<void> {
    // todo pass
  }

  configure(injector: Injector, server: EnlaceServer): void | Promise<void> {
    // todo pass
  }

}