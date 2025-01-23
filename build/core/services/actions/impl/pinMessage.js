import { Action } from '../action.js';
export default class PinMessageAction extends Action {
    id = "pinMessage";
    onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        context.message.pin();
    }
}
