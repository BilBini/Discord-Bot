import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class SendPrivateMessageAction extends Action {
    id = "sendPrivateMessage";
    parameters() {
        return ["member"];
    }
    async onTrigger(script, context, variables) {
        if (!context.member)
            return script.missingContext("member", context);
        const message = await context.member.send(await Utils.setupMessage({ config: script.args, context, variables }));
        const newContext = {
            ...context,
            message,
            content: message.content,
            channel: message.channel
        };
        this.triggerActions(script, newContext, variables);
    }
}
