import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class AddReactionAction extends Action {
    id = "addReaction";
    async onTrigger(script, context, variables) {
        const value = script.args.getStringOrNull("value");
        if (!context.message)
            return script.missingContext("message", context);
        if (!value)
            return script.missingArg("value", context);
        const emoji = await Utils.applyVariables(value, variables, context);
        context.message.react(emoji);
    }
}
