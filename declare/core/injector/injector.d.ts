import { InjectItem, Factory } from './injector_type';
import "reflect-metadata";
import { Constructor } from "../../util/";
export declare const typeInfo: Map<Constructor<any>, Constructor<any>[]>;
export declare function getParams(target: any): void;
export declare class Injector {
    #private;
    static shard: Injector;
    private constructor();
    private itemToProvider;
    /** Constructor */
    register<T>(item: Constructor<T>): void;
    register<T>(item: InjectItem, value: T): void;
    register<T>(item: InjectItem, factory: Factory<T>): void;
    /** Constructor */
    resolve<T>(item: Constructor<T>): T;
    resolve<T>(item: string | symbol): T;
    private construct;
}
