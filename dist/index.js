"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const utils_1 = require("@coxy/utils");
class Logger {
    constructor(params) {
        this.prefixes = [];
        this.uuid = null;
        this.middlewares = [];
        this.options = params;
        this.isEnabled = params.isEnabled !== false;
        if (params.uuid) {
            this.uuid = (0, utils_1.uuid)(params.uuid || 5);
        }
        if (params === null || params === void 0 ? void 0 : params.name) {
            this.prefixes.push(...(0, utils_1.toArray)(params === null || params === void 0 ? void 0 : params.name));
        }
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    setLoggerEnableStatus(flag) {
        this.isEnabled = flag;
    }
    enableTime(isEnabled) {
        if (isEnabled) {
            this.lastTime = Date.now();
        }
        this.isTime = isEnabled;
    }
    resetId() {
        this.uuid = (0, utils_1.uuid)(this.options.uuid || 5);
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
                md(...args);
            });
        }
        if (!this.isEnabled)
            return;
        fn(...args);
    }
    fork(params) {
        let name = this.prefixes;
        if (params.name) {
            name = [...this.prefixes].concat(...(0, utils_1.toArray)(params.name));
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
