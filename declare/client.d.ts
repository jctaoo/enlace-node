/**
 * Used to mark a unique network request instead of a unique user
 */
export declare class Client {
    readonly ip: string;
    readonly id: string;
    constructor(ip: string, id: string);
    static generate(ip: string): Client;
}
