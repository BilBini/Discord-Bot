import { Logger } from '../../utils/index.js';
import { ActionData } from '../../../index.js';
export class ConditionData {
    id;
    fileName;
    path;
    logger;
    args;
    notMetActions;
    manager;
    constructor(manager, condition, notMetAction = true) {
        this.id = condition.getString("id");
        this.fileName = condition.fileName;
        this.path = condition.currentPath;
        this.manager = manager;
        this.logger = new Logger(`Condition/${this.id}`);
        this.args = condition.getSubsection("args");
        this.notMetActions = notMetAction && condition.has("args.not-met-actions") ? condition.getSubsections("args.not-met-actions").map((actionData) => new ActionData(this.manager, actionData, condition.logger)) : [];
    }
    logError(message) {
        this.logger.error(`${message} in ${this.fileName} at ${this.path}`);
        return false;
    }
    missingArg(missing) {
        this.logError(`Missing required argument: "${missing}"`);
        return false;
    }
    missingContext(missing) {
        this.logError(`Missing context: "${missing}"`);
        return false;
    }
}
