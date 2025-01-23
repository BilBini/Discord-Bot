import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class ReplyAction extends Action {
    id = "reply";
    async onTrigger(script, context, variables) {
        let message;
        if (context.interaction && context.interaction.isRepliable()) {
            if (context.interaction.replied) {
                message = await context.interaction.followUp(await Utils.setupMessage({ config: script.args, context, variables }));
            }
            else {
                const reply = await context.interaction.reply(await Utils.setupMessage({ config: script.args, context, variables }));
                message = await reply.fetch();
            }
        }
        else if (context.message) {
            message = await context.message.reply(await Utils.setupMessage({ config: script.args, context, variables }));
        }
        if (!message)
            return;
        const newContext = {
            ...context,
            message,
            content: message.content,
            channel: message.channel
        };
        this.triggerActions(script, newContext, variables);
    }
}
