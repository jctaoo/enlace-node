import { Adaptor } from "../core/";
import { Constructor } from "../util/";
export declare const useAdaptor: <T extends Adaptor>(constructor: Constructor<T>) => T;
