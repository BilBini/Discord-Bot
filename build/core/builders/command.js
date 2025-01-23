import { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';
import { ComponentBuilder } from './index.js';
import Utils from '../utils/index.js';
import { Mixin } from 'ts-mixer';
export class CommandBuilder extends Mixin(SlashCommandBuilder, ComponentBuilder) {
    aliases = [];
    enabled = true;
    using(config) {
        super.using(config);
        if (config.has("description"))
            this.setDescription(config.getString("description"));
        if (config.has("permission"))
            this.setDefaultMemberPermissions(Utils.permissionFlags(config.getString("permission")));
        if (config.has("aliases"))
            this.setAliases(config.getStrings("aliases"));
        if (config.getBoolOrNull("enabled") === false)
            this.setEnabled(false);
        return this;
    }
    setEnabled(enabled) {
        this.enabled = enabled;
        return this;
    }
    setAliases(aliases) {
        this.aliases = aliases;
        return this;
    }
}
export class ContextMenuBuilder extends Mixin(ContextMenuCommandBuilder, ComponentBuilder) {
    enabled;
    using(config) {
        super.using(config);
        if (config.has("permission")) {
            this.setDefaultMemberPermissions(Utils.permissionFlags(config.getString("permission")));
        }
        if (config.getBoolOrNull("enabled") === false)
            this.setEnabled(false);
        return this;
    }
    setEnabled(enabled) {
        this.enabled = enabled;
        return this;
    }
}
