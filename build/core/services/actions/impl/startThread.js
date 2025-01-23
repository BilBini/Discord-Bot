import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class StartThreadAction extends Action {
    id = "startThread";
    async onTrigger(script, context, variables) {
        if (!context.message)
            return script.missingContext("message", context);
        const args = {
            name: await Utils.applyVariables(script.args.getString("value"), variables, context) || "Thread",
            autoArchiveDuration: script.args.getNumberOrNull("duration") || 60
        };
        if (context.message.channel.isThread() || context.message.channel.isDMBased())
            return script.missingContext("channel", context);
        const thread = await context.message.startThread(args);
        const newContext = {
            ...context,
            message: await thread.fetchStarterMessage() || context.message,
            content: thread.name,
            channel: thread
        };
        this.triggerActions(script, newContext, variables);
    }
}
