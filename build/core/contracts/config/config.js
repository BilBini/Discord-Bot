import Utils from '../../utils/index.js';
export class Config {
    values;
    logger;
    currentPath;
    fileName;
    constructor(logger, fileName = '', currentPath = '') {
        this.values = new Map();
        this.logger = logger;
        this.currentPath = currentPath;
        this.fileName = fileName;
    }
    init(values) {
        this.values.clear();
        const normalizedValues = this.normalizeToConfig(values);
        for (const [key, value] of normalizedValues) {
            this.values.set(key, value);
        }
    }
    toPlaintext() {
        return JSON.stringify(Object.fromEntries(this.values));
    }
    has(path) {
        return this.getOrNull(path) !== undefined;
    }
    empty() {
        return new Config(this.logger, this.fileName, this.currentPath);
    }
    getOrNull(path) {
        const nearestPath = path.split('.')[0];
        if (path.includes('.')) {
            const remainingPath = path.substring(nearestPath.length + 1);
            if (!remainingPath)
                return undefined;
            const first = this.getOrNull(nearestPath);
            return first instanceof Config ? first.getOrNull(remainingPath) : undefined;
        }
        return this.values.get(nearestPath);
    }
    get(path) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined) {
            const totalPath = this.currentPath ? `${this.currentPath}.${path}` : path;
            throw this.logger.error(`No config value found for "${totalPath}"` + (this.fileName ? ` in file ${this.fileName}` : ""));
        }
        return value;
    }
    getString(path, randomize = false) {
        const value = this.get(path);
        if (TypeCheckers.isString(value))
            return value;
        if (TypeCheckers.isStringArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        throw this.logger.error(`Expected string at path "${path}"`);
    }
    getStringOrNull(path, randomize = false) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined)
            return undefined;
        if (TypeCheckers.isString(value))
            return value;
        if (TypeCheckers.isStringArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        return undefined;
    }
    getStrings(path) {
        const value = this.get(path);
        if (TypeCheckers.isStringArray(value))
            return value;
        if (TypeCheckers.isString(value))
            return [value];
        throw this.logger.error(`Expected string array at path "${path}"`);
    }
    getStringsOrNull(path) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined)
            return undefined;
        if (TypeCheckers.isStringArray(value))
            return value;
        if (TypeCheckers.isString(value))
            return [value];
        return undefined;
    }
    getBool(path) {
        const value = this.get(path);
        if (TypeCheckers.isBoolean(value))
            return value;
        throw this.logger.error(`Expected boolean at path "${path}"`);
    }
    getBoolOrNull(path) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined)
            return undefined;
        if (TypeCheckers.isBoolean(value))
            return value;
        return undefined;
    }
    getNumber(path, randomize = false) {
        const value = this.get(path);
        if (TypeCheckers.isNumber(value))
            return value;
        if (TypeCheckers.isNumberArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        throw this.logger.error(`Expected number at path "${path}"`);
    }
    getNumberOrNull(path, randomize = false) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined)
            return undefined;
        if (TypeCheckers.isNumber(value))
            return value;
        if (TypeCheckers.isNumberArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        return undefined;
    }
    getNumbers(path) {
        const value = this.get(path);
        if (TypeCheckers.isNumberArray(value))
            return value;
        if (TypeCheckers.isNumber(value))
            return [value];
        throw this.logger.error(`Expected number array at path "${path}"`);
    }
    getNumbersOrNull(path) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined)
            return undefined;
        if (TypeCheckers.isNumberArray(value))
            return value;
        if (TypeCheckers.isNumber(value))
            return [value];
        return undefined;
    }
    getSubsection(path, randomize = false) {
        const value = this.get(path);
        if (TypeCheckers.isConfig(value))
            return value;
        if (TypeCheckers.isConfigArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        throw this.logger.error(`Expected subsection at path "${path}"`);
    }
    getSubsectionOrNull(path, randomize = false) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined)
            return undefined;
        if (TypeCheckers.isConfig(value))
            return value;
        if (TypeCheckers.isConfigArray(value) && randomize) {
            return Utils.getRandom(value);
        }
        return undefined;
    }
    getSubsections(path) {
        const value = this.get(path);
        if (TypeCheckers.isConfigArray(value))
            return value;
        if (TypeCheckers.isConfig(value))
            return [value];
        throw this.logger.error(`Expected subsection array at path "${path}"`);
    }
    getSubsectionsOrNull(path) {
        const value = this.getOrNull(path);
        if (value === null || value === undefined)
            return undefined;
        if (TypeCheckers.isConfigArray(value))
            return value;
        if (TypeCheckers.isConfig(value))
            return [value];
        return undefined;
    }
    set(path, obj) {
        const pathParts = path.split('.');
        const nearestPath = pathParts[0];
        const updatedPath = this.currentPath ? `${this.currentPath}.${nearestPath}` : nearestPath;
        if (path.includes('.')) {
            const remainingPath = path.substring(nearestPath.length + 1);
            const section = this.getOrNull(nearestPath) || new Config(this.logger, this.fileName, updatedPath);
            section.set(remainingPath, obj);
            this.values.set(updatedPath, section);
            return;
        }
        if (obj === null) {
            this.values.delete(updatedPath);
        }
        else {
            this.values.set(updatedPath, obj);
        }
    }
    normalizeToConfig(obj) {
        const normalized = new Map();
        for (const [key, value] of Object.entries(obj)) {
            if (key == null || value == null)
                continue;
            const stringKey = key.toString();
            normalized.set(stringKey, this.constrainConfigTypes(value, stringKey));
        }
        return normalized;
    }
    constrainConfigTypes(value, path = '') {
        const updatedPath = this.currentPath ? `${this.currentPath}.${path}` : path;
        if (Array.isArray(value)) {
            if (!value.length)
                return [];
            return value.map((item, index) => {
                if (typeof item === 'object') {
                    const config = new Config(this.logger, this.fileName, `${updatedPath}[${index}]`);
                    config.init(item);
                    return config;
                }
                else {
                    return item;
                }
            });
        }
        if (typeof value === 'object') {
            const config = new Config(this.logger, this.fileName, updatedPath);
            config.init(value);
            return config;
        }
        if (typeof value === 'number' && !Number.isInteger(value)) {
            return value.toFixed(2);
        }
        return value;
    }
    toJSON() {
        const obj = {};
        for (const [key, value] of this.values) {
            if (value instanceof Config) {
                obj[key] = value.toJSON();
            }
            else {
                obj[key] = value;
            }
        }
        return obj;
    }
}
class TypeCheckers {
    static isString(value) {
        return typeof value === 'string';
    }
    static isStringArray(value) {
        return Array.isArray(value) && value.every(item => this.isString(item));
    }
    static isNumber(value) {
        return typeof value === 'number';
    }
    static isNumberArray(value) {
        return Array.isArray(value) && value.every(item => this.isNumber(item));
    }
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    static isConfig(value) {
        return value instanceof Config;
    }
    static isConfigArray(value) {
        return Array.isArray(value) && value.every(item => this.isConfig(item));
    }
}
