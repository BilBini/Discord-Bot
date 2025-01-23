import { Action } from '../action.js';
export default class DeleteMessageAction extends Action {
    id = "deleteMessage";
    onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        context.message.delete();
    }
}
