import { Constructor } from "../../util/";
export declare type InjectItem<T = any> = Constructor<T> | string | symbol;
export interface InjectedItemProvider<T = any> {
    get: () => T;
}
export interface Factory<T = any> {
    create: () => T;
}
export declare function isFactory(obj: any): boolean;
