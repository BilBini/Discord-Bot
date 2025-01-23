import { Client, Collection } from 'discord.js';
import { existsSync, mkdirSync } from 'fs';
import { Logger } from './utils/index.js';
import { BaseConfig } from './contracts/index.js';
import { Sequelize } from 'sequelize-typescript';
import EventService from './services/events/eventService.js';
import UserService from './services/users/userService.js';
import CommandService from './services/commands/commandService.js';
import EngineService from './services/engine/engineService.js';
import PluginService from './services/plugins/pluginService.js';
import ExpansionService from './services/expansions/expansionService.js';
import ComponentService from './services/components/componentService.js';
import LeaderboardService from './services/leaderboards/leaderboardService.js';
import ConditionService from './services/conditions/conditionService.js';
import ActionService from './services/actions/actionService.js';
import DefaultConfig from '../core/resources/config.js';
import CommandConfig from '../core/resources/commands.js';
import LangConfig from '../core/resources/lang.js';
export class Manager {
    client;
    services = {};
    configs = {};
    database;
    managerOptions;
    commands = new Collection();
    events = new Collection();
    plugins = new Collection();
    expansions = new Collection();
    leaderboards = new Collection();
    components = {
        buttons: new Collection(),
        selectMenus: new Collection(),
        modals: new Collection()
    };
    logger = new Logger();
    primaryGuildId;
    constructor(clientOptions, managerOptions) {
        this.client = new Client(clientOptions);
        this.managerOptions = managerOptions;
        if (!existsSync(managerOptions.dir.configs))
            mkdirSync(managerOptions.dir.configs);
        if (!existsSync(managerOptions.dir.plugins))
            mkdirSync(managerOptions.dir.plugins);
        if (!existsSync(managerOptions.dir.logs))
            mkdirSync(managerOptions.dir.logs);
    }
    async initialize() {
        this.configs.config = await this.initializeConfig(DefaultConfig, 'config.yml');
        this.configs.commands = await this.initializeConfig(CommandConfig, 'commands.yml');
        this.configs.lang = await this.initializeConfig(LangConfig, 'lang.yml');
        this.primaryGuildId = this.configs.config.getString("primary-guild");
        await this.initializeDatabase();
        this.services = {
            condition: new ConditionService(this),
            action: new ActionService(this),
            engine: new EngineService(this),
            expansion: new ExpansionService(this),
            user: new UserService(this),
            event: new EventService(this),
            command: new CommandService(this),
            component: new ComponentService(this),
            leaderboard: new LeaderboardService(this),
            plugin: new PluginService(this)
        };
        await this.initializeServices();
        await this.services.engine.loadCustomCommands();
        this.services.leaderboard.registerLeaderboards();
        this.services.event.initializeEvents();
        this.client.login(this.configs.config.getString("token"));
        this.client.on('reconnecting', () => {
            this.logger.debug('The client is trying to reconnect.');
        });
        this.client.on('disconnect', () => {
            this.logger.debug('The client has disconnected.');
        });
        this.client.on('resumed', () => {
            this.logger.debug('The client has successfully reconnected.');
        });
    }
    async initializeConfig(ConfigClass, filePath) {
        return await new BaseConfig({
            logger: this.logger,
            configFilePath: `configs/${filePath}`,
            defaultFilePath: `build/core/resources/${filePath}`,
            ConfigClass
        }).initialize();
    }
    async initializeDatabase() {
        this.logger.info('Initializing database...');
        const databaseConfig = this.configs.config.getSubsection('database');
        if (['mysql', 'mariadb'].includes(databaseConfig.getString('type'))) {
            this.database = new Sequelize(databaseConfig.getString('database'), databaseConfig.getString('username'), databaseConfig.getString('password'), {
                host: databaseConfig.getString('host'),
                dialect: databaseConfig.getString('type'),
                logging: databaseConfig.getBoolOrNull('debug') || false
            });
        }
        else {
            this.database = new Sequelize({
                dialect: 'sqlite',
                storage: 'database.sqlite',
                logging: databaseConfig.getBoolOrNull('debug') || false
            });
        }
        try {
            await this.database.authenticate();
            this.logger.info('Connection has been established successfully with database.');
        }
        catch (error) {
            this.logger.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    }
    async initializeServices() {
        for (const service of Object.values(this.services)) {
            await service.initialize();
        }
    }
}
