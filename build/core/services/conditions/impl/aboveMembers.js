import { Condition } from '../condition.js';
export default class AboveMembersCondition extends Condition {
    id = "aboveMembers";
    isMet(condition, context, variables) {
        if (!context.guild)
            return condition.missingContext("guild");
        const amount = condition.args.getNumberOrNull("amount");
        if (!amount)
            return condition.missingArg("amount");
        return context.guild.memberCount > amount;
    }
}
