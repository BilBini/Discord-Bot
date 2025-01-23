import { Action } from '../action.js';
export default class UnpinMessageAction extends Action {
    id = "unpinMessage";
    onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        context.message.unpin();
    }
}
