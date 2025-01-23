import { Action } from '../action.js';
import Utils from '../../../utils/index.js';
export default class AddRoleAction extends Action {
    id = "addRole";
    async onTrigger(script, context, variables) {
        const rolesToAdd = script.args.getStringsOrNull("value");
        if (!context.member)
            return script.missingContext("member", context);
        if (!context.guild)
            return script.missingContext("guild", context);
        if (!rolesToAdd)
            return script.missingArg("value", context);
        let roles = await Promise.all(rolesToAdd.map(async (roleName) => Utils.findRole(await Utils.applyVariables(roleName, variables, context), context.guild)));
        roles = roles.filter(Boolean);
        if (roles.length) {
            await context.member.roles.add(roles);
        }
    }
}
