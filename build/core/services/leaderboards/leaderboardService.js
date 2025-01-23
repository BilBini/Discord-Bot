import { Command } from '../../../index.js';
import { CommandBuilder } from '../../builders/index.js';
import Utils, { Pagination } from '../../utils/index.js';
import { PaginationType, Service } from '../../contracts/index.js';
import { sync } from 'glob';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
/**
 * Service to manage leaderboards in the bot.
 */
export default class LeaderboardService extends Service {
    leaderboards;
    constructor(manager) {
        super(manager);
        this.leaderboards = manager.leaderboards;
    }
    async initialize() {
        this.manager.logger.info("Leaderboard services initialized.");
        await this.registerFromDir(join(dirname(fileURLToPath(import.meta.url)), 'impl'));
    }
    async registerFromDir(leaderboardsDir, plugin = undefined) {
        const leaderboardFiles = sync(join(leaderboardsDir, '**', '*.js').replace(/\\/g, '/'));
        for (const filePath of leaderboardFiles) {
            const leaderboardPath = new URL('file://' + filePath.replace(/\\/g, '/')).href;
            const { default: leaderboard } = await import(leaderboardPath);
            this.registerLeaderboard(new leaderboard(this.manager, plugin));
        }
        ;
    }
    registerLeaderboard(leaderboard) {
        if (this.leaderboards.has(leaderboard.name)) {
            return this.manager.logger.error(`An leaderboard with the identifier ${leaderboard.name} is already registered.`);
        }
        this.leaderboards.set(leaderboard.name, leaderboard);
    }
    unregisterLeaderboard(identifier) {
        this.leaderboards.delete(identifier);
    }
    async registerLeaderboards() {
        class LeaderboardCommands extends Command {
            build() {
                const data = new CommandBuilder()
                    .setName('leaderboard')
                    .using(this.manager.configs.commands.getSubsection('leaderboard'));
                for (const [key, leaderboard] of this.manager.services.leaderboard.leaderboards) {
                    data.addSubcommand(subcommand => subcommand
                        .setName(key)
                        .setDescription(leaderboard.description));
                }
                return data;
            }
            async execute(interaction) {
                await this.manager.services.leaderboard.leaderboardCommand(interaction, interaction.options.getSubcommand());
            }
        }
        this.manager.services.command.registerCommand(new LeaderboardCommands(this.manager));
    }
    async leaderboardCommand(interaction, indentifier) {
        const leaderboard = this.leaderboards.get(indentifier);
        if (!leaderboard)
            return interaction.reply("Leaderboard not found.");
        const leaderboardData = await leaderboard.getData();
        new Pagination(interaction, leaderboardData.map(item => { return { message: item }; }), this.manager.configs.lang.getSubsection('leaderboard'))
            .setType(PaginationType.Button)
            .setVariables([{ searchFor: "%leaderboard_name%", replaceWith: Utils.capitalizeFirst(leaderboard.name) }])
            .setItemsPerPage(10)
            .send();
    }
}
