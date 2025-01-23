import { Events } from '../../../contracts/index.js';
import { Event } from '../../../../index.js';
export default class EveryHourEvent extends Event {
    name = Events.EveryHour;
    async execute() {
        const guild = this.manager.client.guilds.cache.get(this.manager.primaryGuildId);
        const context = {
            guild: guild,
        };
        this.manager.services.engine.event.emit('everyHour', context);
    }
}
;
