import { Cooldown } from '../utils/index.js';
import Utils from '../utils/index.js';
export class ComponentBuilder {
    cooldown = new Cooldown(0);
    requiredRoles = [];
    requiredChannels = [];
    requiredUsers = [];
    inherited = true;
    permissions = [];
    public = false;
    using(config) {
        if (config.has("cooldown"))
            this.setCooldown(config.getNumber("cooldown"));
        if (config.has("permissions"))
            this.setPermissions(config.getStrings("permissions"));
        if (config.has("roles"))
            this.setRequiredRoles(config.getStrings("roles"));
        if (config.has("channels"))
            this.setRequiredChannels(config.getStrings("channels"));
        if (config.has("users"))
            this.setRequiredUsers(config.getStrings("users"));
        if (config.has("inherited") === false)
            this.setInherited(false);
        return this;
    }
    setInherited(inherited) {
        this.inherited = inherited;
        return this;
    }
    setCooldown(cooldown) {
        this.cooldown = new Cooldown(cooldown);
        return this;
    }
    setRequiredRoles(roles) {
        this.requiredRoles = roles;
        return this;
    }
    setRequiredChannels(channels) {
        this.requiredChannels = channels;
        return this;
    }
    setRequiredUsers(users) {
        this.requiredUsers = users;
        return this;
    }
    setPermissions(permissions) {
        for (const permission of permissions) {
            const flag = Utils.permissionFlags(permission);
            if (flag)
                this.permissions.push(flag);
        }
        return this;
    }
    setPublic() {
        this.public = true;
        return this;
    }
}
