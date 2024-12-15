export declare function uuid(len?: number): string;
export declare function toArray<T>(any: T | T[]): T[];
interface LoggerConstructorParams {
    name: string[] | string;
    uuidLen?: number;
    isEnabled?: boolean;
}
type Args = unknown;
type Middleware = (...args: Args[]) => void;
export declare class Logger {
    protected readonly prefixes: string[];
    private uuid;
    private isEnabled;
    private isTime;
    private lastTime;
    private middlewares;
    private options;
    constructor(params?: LoggerConstructorParams);
    use(middleware: Middleware): void;
    setEnableStatus(flag: boolean): void;
    setEnableTime(isEnabled: boolean): void;
    resetId(): void;
    private message;
    fork(params?: LoggerConstructorParams): Logger;
    log(...args: Args[]): void;
    warn(...args: Args[]): void;
    error(...args: Args[]): void;
    info(...args: Args[]): void;
}
export {};
