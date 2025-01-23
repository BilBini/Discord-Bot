import { Events } from '../../../contracts/index.js';
import { Event } from '../../../../index.js';
export default class EveryMinuteEvent extends Event {
    name = Events.EveryMinute;
    async execute() {
        const guild = this.manager.client.guilds.cache.get(this.manager.primaryGuildId);
        const context = {
            guild: guild,
        };
        this.manager.services.engine.event.emit('everyMinute', context);
    }
}
;
