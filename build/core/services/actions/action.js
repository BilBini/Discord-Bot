import { Base } from '../../contracts/index.js';
export class Action extends Base {
    trigger(script, context, variables) {
        const variablesCopy = [...variables];
        this.onTrigger(script, context, variablesCopy);
    }
    triggerActions(script, context, variables) {
        script.triggerActions.forEach(subAction => subAction.run(context, variables));
    }
}
