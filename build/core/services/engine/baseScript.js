import { ActionData } from '../../../index.js';
export class BaseScript {
    data;
    conditions;
    actions;
    logger;
    manager;
    constructor(manager, data, logger) {
        this.logger = logger;
        this.manager = manager;
        this.data = data;
        this.conditions = data.has("conditions") ? manager.services.condition.buildConditions(data.getSubsections("conditions")) : [];
        this.actions = data.has("actions") ? data.getSubsections("actions").map((actionData) => new ActionData(manager, actionData, logger)) : [];
    }
    async meetsConditions(context, variables) {
        return this.manager.services.condition.meetsConditions(this.conditions, context, variables);
    }
}
