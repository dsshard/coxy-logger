"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.toArray = exports.uuid = void 0;
const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
function uuid(len = 100) {
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`.slice(0, len);
}
exports.uuid = uuid;
function toArray(any) {
    return Array.isArray(any) ? any : [any];
}
exports.toArray = toArray;
class Logger {
    constructor(params) {
        this.prefixes = [];
        this.uuid = null;
        this.middlewares = [];
        this.options = params;
        this.isEnabled = params.isEnabled !== false;
        if (params.uuid) {
            this.uuid = uuid(params.uuid || 5);
        }
        if (params === null || params === void 0 ? void 0 : params.name) {
            this.prefixes.push(...toArray(params === null || params === void 0 ? void 0 : params.name));
        }
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    setEnableStatus(flag) {
        this.isEnabled = flag;
    }
    setEnableTime(isEnabled) {
        if (isEnabled) {
            this.lastTime = Date.now();
        }
        this.isTime = isEnabled;
    }
    resetId() {
        this.uuid = uuid(this.options.uuid || 5);
    }
    message(type, ...args) {
        const fn = console[type];
        if (this.isTime) {
            args.unshift(`[time: ${Date.now() - this.lastTime}ms]`);
            this.lastTime = Date.now();
        }
        if (this.uuid)
            args.unshift(`[${this.uuid}]`);
        if (this.prefixes.length) {
            [...this.prefixes].reverse().forEach((prefix) => {
                args.unshift(`[${prefix}]`);
            });
        }
        if (this.middlewares.length > 0) {
            this.middlewares.forEach((md) => {
                md(type, ...args);
            });
        }
        if (!this.isEnabled)
            return;
        fn(...args);
    }
    fork(params) {
        let name = this.prefixes;
        if (params.name) {
            name = [...this.prefixes].concat(...toArray(params.name));
        }
        const logger = new Logger(Object.assign(Object.assign({}, params), { name, isEnabled: this.isEnabled }));
        if (this.middlewares.length) {
            this.middlewares.forEach((md) => {
                logger.use(md);
            });
        }
        return logger;
    }
    log(...args) {
        this.message('log', ...args);
    }
    warn(...args) {
        this.message('warn', ...args);
    }
    error(...args) {
        this.message('error', ...args);
    }
    info(...args) {
        this.message('info', ...args);
    }
}
exports.Logger = Logger;
