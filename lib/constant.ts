import { int, TrueFunction } from "./util";
import {
  ApplicationConfig,
  EndpointConfig,
  MiddlewareConfig,
  AdaptorConfig,
} from "./core/";

export const DEFAULT_PORT: int = 20203;
export const DEFAULT_HOST: string = "localhost";
export const LOGO: string =
  "\t" + "  ___  ____  / /___ _________ " + "\n" +
  "\t" + " / _ \\/ __ \\/ / __ `/ ___/ _ \\" + "\n" +
  "\t" + "/  __/ / / / / /_/ / /__/  __/" + "\n" +
  "\t" + "\\___/_/ /_/_/\\__,_/\\___/\\___/ " + "\n";

export const PROJECT_NAME: string = 'enlace'

export const WELCOME_WORDS: string = "starting...\n"

export const DEFAULT_APP_CONFIG: ApplicationConfig = {
  scan: false,
}

export const DEFAULT_ADAPTOR_CONFIG: AdaptorConfig = {
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
}

export const DEFAULT_ENDPOINT_CONFIG: EndpointConfig = {
  expectedPath: "*",
  selectAdaptor: TrueFunction,
}

export const DEFAULT_MIDDLEWARE_CONFIG: MiddlewareConfig = {
  expectedPath: "*",
}
