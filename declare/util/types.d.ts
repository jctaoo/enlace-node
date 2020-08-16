import LogClass from "./log";
export declare type int = number;
export declare const Log: typeof LogClass;
export declare const TrueFunction: (...arg: unknown[]) => boolean;
export declare type PathParameter = {
    [key: string]: string;
};
export declare type Constructor<T> = {
    new (...args: any[]): T;
};
