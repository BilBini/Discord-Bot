import { Condition } from '../../../../index.js';
export default class ContentContainsCondition extends Condition {
    id = "contentContains";
    isMet(condition, context, variables) {
        const arg = condition.args.getStringsOrNull("value");
        if (!arg)
            return condition.missingArg("value");
        if (!context.content)
            return condition.missingContext("content");
        return arg && arg.some(text => context.content.includes(text));
    }
}
