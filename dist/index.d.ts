interface LoggerConstructorParams {
    name: string[] | string;
    uuid?: number;
    isEnabled?: boolean;
}
declare type Args = any;
declare type Middleware = (...args: Args[]) => void;
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
    disableLogger(flag: boolean): void;
    enableTime(isEnabled: boolean): void;
    resetId(): void;
    private message;
    fork(params?: LoggerConstructorParams): Logger;
    log(...args: Args[]): void;
    warn(...args: Args[]): void;
    error(...args: Args[]): void;
    info(...args: Args[]): void;
}
export {};
