import { Expansion } from '../expansion.js';
import Utils from '../../../utils/index.js';
export default class OwnerExpansion extends Expansion {
    name = 'owner';
    async onRequest(context, placeholder) {
        if (!context.guild)
            return "No guild found";
        const owner = await context.guild.fetchOwner();
        const ownerUser = await this.manager.services.user.findOrCreate(owner);
        return Utils.applyVariables(`%owner_${placeholder}%`, Utils.userVariables(ownerUser, 'owner'));
    }
}
