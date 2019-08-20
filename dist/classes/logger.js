"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
class Logger {
    constructor() {
        this.loggerConfigure = log4js_1.default.configure({
            appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
            categories: { default: { appenders: ['cheese'], level: 'error' } }
        });
        this.logger = log4js_1.default.getLogger('cheese');
    }
}
exports.Logger = Logger;
