import { join } from 'path';
import { sync } from 'glob';
import { Service } from '../../contracts/index.js';
/**
 * Service to manage components in the bot.
 * Components are used to create buttons, select menus, and modals.
 */
export default class ComponentService extends Service {
    buttons;
    selectMenus;
    modals;
    constructor(manager) {
        super(manager);
        this.buttons = manager.components.buttons;
        this.selectMenus = manager.components.selectMenus;
        this.modals = manager.components.modals;
    }
    async initialize() {
        this.manager.logger.info("Component service initialized.");
    }
    getButton(name) {
        return this.buttons.get(name) || null;
    }
    getSelectMenu(name) {
        return this.selectMenus.get(name) || null;
    }
    getModal(name) {
        return this.modals.get(name) || null;
    }
    getButtons() {
        return this.buttons;
    }
    getSelectMenus() {
        return this.selectMenus;
    }
    getModals() {
        return this.modals;
    }
    async registerFromDir(componentDir, type, plugin = undefined) {
        const componentFiles = sync(join(componentDir, '**', '*.js').replace(/\\/g, '/'));
        for (const filePath of componentFiles) {
            const componentPath = new URL('file://' + filePath.replace(/\\/g, '/')).href;
            const { default: Component } = await import(componentPath);
            switch (type) {
                case 'button':
                    await this.registerButton(new Component(this.manager, plugin));
                    break;
                case 'selectMenu':
                    await this.registerSelectMenu(new Component(this.manager, plugin));
                    break;
                case 'modal':
                    await this.registerModal(new Component(this.manager, plugin));
                    break;
            }
        }
        ;
    }
    async registerButton(button) {
        try {
            if (this.buttons.has(button.customId))
                throw new Error("Button already exists.");
            this.buttons.set(button.customId, button);
        }
        catch (e) {
            button.logger.error(`Error initializing button '${button.customId}'`, e.stack);
        }
    }
    async registerSelectMenu(selectMenu) {
        try {
            if (this.selectMenus.has(selectMenu.customId))
                throw new Error("SelectMenu already exists.");
            this.selectMenus.set(selectMenu.customId, selectMenu);
        }
        catch (e) {
            selectMenu.logger.error(`Error initializing selectMenu '${selectMenu.customId}'`, e.stack);
        }
    }
    async registerModal(modal) {
        try {
            if (this.modals.has(modal.customId))
                throw new Error("Modal already exists.");
            this.modals.set(modal.customId, modal);
        }
        catch (e) {
            modal.logger.error(`Error initializing modal '${modal.customId}'`, e.stack);
        }
    }
}
