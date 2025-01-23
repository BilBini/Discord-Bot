import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class SendMessageAction extends Action {
    id = "sendMessage";
    async onTrigger(script, context, variables) {
        if (!context.channel || !context.channel.isTextBased() || context.channel.isDMBased())
            return script.missingArg("channel", context);
        const message = await context.channel.send(await Utils.setupMessage({ config: script.args, context, variables }));
        const newContext = {
            ...context,
            message,
            content: message.content,
            channel: message.channel
        };
        this.triggerActions(script, newContext, variables);
    }
}
