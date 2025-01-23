import { BaseScript } from '../../../index.js';
export class CustomCommand extends BaseScript {
    async run(context, variables) {
        if (!await this.meetsConditions(context, variables))
            return;
        this.actions.forEach(action => action.run(context, variables));
    }
}
