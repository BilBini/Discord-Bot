import { hyperlink, hideLinkEmbed } from 'discord.js';
import Utils from '../../../utils/index.js';
import { CommandBuilder } from '../../../builders/index.js';
import { Pagination } from '../../../utils/index.js';
import { Command } from '../../../../index.js';
import PluginModel from '../../plugins/plugin.model.js';
export default class PluginCommand extends Command {
    build() {
        const command = this.manager.configs.commands.getSubsection("plugin");
        return new CommandBuilder()
            .setName('plugin')
            .using(command)
            .addSubcommand(subcommand => subcommand
            .setName('list')
            .setDescription(command.getString("subcommands.list.description")))
            .addSubcommand(subcommand => subcommand
            .setName('enable')
            .setDescription(command.getString("subcommands.enable.description"))
            .addStringOption(option => option.setName("plugin")
            .setDescription(command.getString("subcommands.enable.options.plugin"))
            .setRequired(true)
            .setAutocomplete(true)))
            .addSubcommand(subcommand => subcommand
            .setName('disable')
            .setDescription(command.getString("subcommands.disable.description"))
            .addStringOption(option => option.setName("plugin")
            .setDescription(command.getString("subcommands.disable.options.plugin"))
            .setRequired(true)
            .setAutocomplete(true)));
    }
    async autocomplete(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const focusedValue = interaction.options.getFocused();
        const enabled = (subcommand == "disable");
        let allPlugins = await PluginModel.findAll({
            where: { enabled: enabled }
        });
        if (focusedValue) {
            allPlugins = allPlugins.filter((plugin) => plugin.name.includes(focusedValue));
        }
        const choices = allPlugins.map((plugin) => {
            return { name: plugin.name, value: plugin.name };
        });
        await interaction.respond(choices);
    }
    async execute(interaction, user) {
        const subcommand = interaction.options.getSubcommand();
        const lang = this.manager.configs.lang;
        let pluginName;
        let plugin;
        switch (subcommand) {
            case 'enable':
            case 'disable': {
                pluginName = interaction.options.getString("plugin", true);
                plugin = await PluginModel.findOne({ where: { name: pluginName } });
                if (!plugin) {
                    return interaction.reply(await Utils.setupMessage({
                        config: lang.getSubsection("plugin.not-found"),
                        variables: [
                            { searchFor: "%plugin_name%", replaceWith: pluginName }
                        ],
                        context: {
                            user: user,
                            guild: interaction.guild || undefined,
                            channel: interaction.channel || undefined
                        }
                    }));
                }
                if (plugin.enabled && subcommand === "enable" || !plugin.enabled && subcommand === "disable") {
                    return interaction.reply(await Utils.setupMessage({
                        config: lang.getSubsection(`plugin.already-${subcommand}d`),
                        variables: [
                            { searchFor: "%plugin_name%", replaceWith: pluginName }
                        ],
                        context: {
                            user: user,
                            guild: interaction.guild || undefined,
                            channel: interaction.channel || undefined
                        }
                    }));
                }
                await plugin.update({ enabled: subcommand === "enable" ? true : false });
                interaction.reply(await Utils.setupMessage({
                    config: lang.getSubsection(`plugin.${subcommand}d`),
                    variables: [
                        { searchFor: "%plugin_name%", replaceWith: pluginName }
                    ],
                    context: {
                        user: user,
                        guild: interaction.guild || undefined,
                        channel: interaction.channel || undefined
                    }
                }));
                break;
            }
            case 'list': {
                const pluginInfo = lang.getString("plugin.information");
                async function getPluginDetails(plugin) {
                    const status = plugin.enabled ? '✅' : '❌';
                    const info = await Utils.applyVariables(pluginInfo, [
                        { searchFor: "%status%", replaceWith: status },
                        { searchFor: "%name%", replaceWith: plugin.name },
                        { searchFor: "%version%", replaceWith: plugin.version },
                        { searchFor: "%description%", replaceWith: plugin.description },
                        { searchFor: "%authors%", replaceWith: plugin.authors.join(', ') },
                        { searchFor: "%website%", replaceWith: hyperlink("Website", hideLinkEmbed(plugin.website || '')) },
                        { searchFor: "%has_description%", replaceWith: plugin.description ? true : false },
                        { searchFor: "%has_website%", replaceWith: plugin.website ? true : false }
                    ]);
                    return {
                        label: plugin.name,
                        emoji: status,
                        message: Utils.removeHiddenLines(info)
                    };
                }
                ;
                const plugins = await Promise.all(this.manager.services.plugin.plugins.map(getPluginDetails));
                new Pagination(interaction, plugins, lang.getSubsection("plugin.list"))
                    .setContext({
                    user: user,
                    guild: interaction.guild,
                    channel: interaction.channel || undefined
                })
                    .send();
                break;
            }
        }
    }
}
