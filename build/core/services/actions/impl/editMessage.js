import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class EditMessageAction extends Action {
    id = "editMessage";
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingArg("message", context);
        const message = await context.message.edit(await Utils.setupMessage({ config: script.args, context, variables }));
        const newContext = {
            ...context,
            message,
            content: message.content,
            channel: message.channel
        };
        this.triggerActions(script, newContext, variables);
    }
}
