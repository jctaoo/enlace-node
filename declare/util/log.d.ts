export default class Log {
    static clear(): void;
    static info(message: string, tag?: string): void;
    static success(message: string, tag?: string): void;
    static warning(message: string, tag?: string): void;
    static error(message: string, tag?: string): void;
}
