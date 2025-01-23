import { CommandBuilder } from '../../../builders/index.js';
import { Command } from '../../../../index.js';
import Utils from '../../../utils/index.js';
export default class ReloadCommand extends Command {
    build() {
        const command = this.manager.configs.commands.getSubsection("reload");
        return new CommandBuilder()
            .setName('reload')
            .using(command);
    }
    async execute(interaction, user) {
        this.logger.info(`Reloading the bot...`);
        this.manager.commands.clear();
        await this.manager.services.command.initialize();
        this.manager.services.engine.event.removeAllListeners();
        this.manager.services.engine.scripts.clear();
        let error;
        try {
            await this.manager.services.engine.loadScripts();
            await this.manager.services.engine.loadCustomCommands();
            await Promise.all(this.manager.plugins.map(async (plugin) => {
                await plugin.unload();
                await plugin.load();
                await plugin.loadComponents(['commands']);
            }));
        }
        catch (e) {
            error = e;
        }
        this.logger.info(`Bot reloaded! Deploying commands...`);
        this.manager.services.command.deployCommands();
        if (error) {
            return interaction.reply(await Utils.setupMessage({
                config: this.manager.configs.lang.getSubsection(`error-reloading`),
                variables: [
                    { searchFor: "%error_message%", replaceWith: error.toString() }
                ],
                context: {
                    user: user,
                    guild: interaction.guild,
                    channel: interaction.channel || undefined
                }
            }));
        }
        interaction.reply(await Utils.setupMessage({
            config: this.manager.configs.lang.getSubsection(`reloaded`),
            context: {
                user: user,
                guild: interaction.guild,
                channel: interaction.channel || undefined
            }
        }));
    }
}
