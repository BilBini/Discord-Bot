import { Condition } from '../../../../index.js';
export default class BellowMembersCondition extends Condition {
    id = "bellowMembers";
    isMet(condition, context, variables) {
        if (!context.guild)
            return condition.missingContext("guild");
        const amount = condition.args.getNumberOrNull("amount");
        if (!amount)
            return condition.missingArg("amount");
        return context.guild.memberCount < amount;
    }
}
