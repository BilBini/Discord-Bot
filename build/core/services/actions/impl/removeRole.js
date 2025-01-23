import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class RemoveRoleAction extends Action {
    id = "removeRole";
    async onTrigger(script, context, variables) {
        const rolesToRemove = script.args.getStringsOrNull("value");
        if (!context.member)
            return script.missingContext("member", context);
        if (!rolesToRemove)
            return script.missingArg("value", context);
        let roles = await Promise.all(rolesToRemove.map(async (roleName) => Utils.findRole(await Utils.applyVariables(roleName, variables, context), context.guild)));
        roles = roles.filter(Boolean);
        if (roles.length) {
            context.member.roles.remove(roles);
        }
    }
}
