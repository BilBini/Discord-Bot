import { Condition } from '../../../../index.js';
export default class RegexCondition extends Condition {
    id = "regex";
    isMet(condition, context, variables) {
        const arg = condition.args.getStringsOrNull("value");
        if (!arg)
            return condition.missingArg("value");
        if (!context.content)
            return condition.missingContext("content");
        return arg && arg.some(regex => new RegExp(regex).test(context.content));
    }
}
