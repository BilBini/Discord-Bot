export { Events } from './events.js';
export { IsPermissionFlag, IsActivityType, IsTextInputStyle, IsChannelType, IsCommandOptionType, IsBooleanOrString } from './decorators/validator.js';
export { BaseConfig } from './config/baseConfig.js';
export { BaseConfigSection } from './config/baseConfigSection.js';
import { Config } from './config/config.js';
export { CommandValidator } from './validators/command.js';
export { MessageValidator } from './validators/message.js';
export { ButtonValidator, ComponentValidator, ModalValidator } from './validators/component.js';
export { ConditionValidator, MutatorValidator, ActionValidator, TriggerActionValidator } from './validators/scripting.js';
export { Config };
export var PaginationType;
(function (PaginationType) {
    PaginationType["SelectMenu"] = "select_menu";
    PaginationType["Button"] = "button";
})(PaginationType || (PaginationType = {}));
export class Base {
    manager;
    plugin;
    logger;
    constructor(manager, plugin) {
        this.manager = manager;
        this.plugin = plugin;
        this.logger = plugin ? plugin.logger : manager.logger;
    }
}
export class Service {
    manager;
    constructor(manager) {
        this.manager = manager;
    }
}
