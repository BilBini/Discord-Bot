import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class RemoveReactionAction extends Action {
    id = "removeReaction";
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        const emoji = await Utils.applyVariables(script.args.getStringOrNull('value'), variables, context);
        return emoji
            ? context.message.reactions.cache.get(emoji)?.remove()
            : context.message.reactions.removeAll();
    }
}
