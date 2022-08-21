"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const utils_1 = require("@coxy/utils");
class Logger {
    constructor(params) {
        this.prefixes = [];
        this.uuid = null;
        this.options = params;
        this.isEnabled = params.isEnabled !== false;
        if (params.uuid) {
            this.uuid = (0, utils_1.uuid)(params.uuid || 5);
        }
        if (params === null || params === void 0 ? void 0 : params.name) {
            this.prefixes.push(...(0, utils_1.toArray)(params === null || params === void 0 ? void 0 : params.name));
        }
    }
    setEnabledFlag(flag) {
        this.isEnabled = flag;
    }
    resetId() {
        this.uuid = (0, utils_1.uuid)(this.options.uuid || 5);
    }
    message(type, ...args) {
        if (process.env.NODE_ENV === 'test')
            return;
        if (!this.isEnabled)
            return;
        const fn = console[type];
        if (this.uuid)
            args.unshift(`[${this.uuid}]`);
        if (this.prefixes.length) {
            [...this.prefixes].reverse().forEach((prefix) => {
                args.unshift(`[${prefix}]`);
            });
        }
        fn(...args);
    }
    fork(params) {
        const name = [...this.prefixes].concat(...(0, utils_1.toArray)(params.name));
        return new Logger(Object.assign(Object.assign({}, params), { name }));
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
