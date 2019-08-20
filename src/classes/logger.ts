import log4js from 'log4js';

export class Logger {

    protected loggerConfigure: any;

    protected logger: any;

    constructor() {
        this.loggerConfigure =  log4js.configure({
            appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
            categories: { default: { appenders: ['cheese'], level: 'error' } }
        });

        this.logger = log4js.getLogger('cheese');
    }

}