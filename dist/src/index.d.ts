interface LoggerConstructorParams {
    name: string[] | string;
    uuid?: number;
    isEnabled?: boolean;
}
export declare class Logger {
    protected readonly prefixes: string[];
    private uuid;
    private isEnabled;
    private options;
    constructor(params?: LoggerConstructorParams);
    setEnabledFlag(flag: boolean): void;
    resetId(): void;
    private message;
    fork(params?: LoggerConstructorParams): Logger;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
}
export {};
