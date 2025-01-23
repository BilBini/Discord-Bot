import { Condition } from '../../../../index.js';
import Utils from '../../../utils/index.js';
export default class HasRoleCondition extends Condition {
    id = "hasRole";
    isMet(condition, context, variables) {
        if (!context.member)
            return condition.missingContext("member");
        const role = condition.args.getStringOrNull("value");
        if (!role)
            return condition.missingArg("value");
        return Utils.hasRole(context.member, role, condition.args.getBoolOrNull("inherit"));
    }
}
