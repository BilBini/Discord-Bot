import chalk from 'chalk';
import * as fs from 'fs';
import { stdout } from 'process';
import logManager from './logManager.js';
export class Logger {
    prefix;
    logFile;
    constructor(prefix = "ItsMyBot") {
        this.prefix = prefix;
        this.logFile = fs.createWriteStream('./logs/latest.log', { flags: 'a' });
    }
    getCurrentTimestamp() {
        return new Date().toLocaleTimeString();
    }
    warn(...text) {
        const timestamp = this.getCurrentTimestamp();
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#FADD05")("[WARN]"))}: [${this.prefix}] ${text.join('\n')}`;
        stdout.write(message + '\n');
        logManager.log(message);
    }
    error(...text) {
        const timestamp = this.getCurrentTimestamp();
        const messageParts = [];
        for (const item of text) {
            if (item instanceof Error) {
                messageParts.push(item.message);
                if (item.stack)
                    messageParts.push(item.stack);
            }
            else {
                messageParts.push(item);
            }
        }
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#FF380B")("[ERROR]"))}: [${this.prefix}] ${messageParts.join('\n')}`;
        stdout.write(message + '\n');
        logManager.log(message);
    }
    empty(...text) {
        const message = text.join(' ');
        stdout.write(message + '\n');
        logManager.log(message);
    }
    info(...text) {
        const timestamp = this.getCurrentTimestamp();
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#61FF73")("[INFO]"))}: [${this.prefix}] ${text.join('\n')}`;
        stdout.write(message + '\n');
        logManager.log(message);
    }
    debug(...text) {
        const timestamp = this.getCurrentTimestamp();
        const message = `[${timestamp}] ${chalk.bold(chalk.hex("#17D5F7")("[DEBUG]"))}: [${this.prefix}] ${text.join('\n')}`;
        stdout.write(message + '\n');
        logManager.log(message);
    }
}
