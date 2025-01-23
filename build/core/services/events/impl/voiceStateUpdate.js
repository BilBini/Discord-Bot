import { Events } from '../../../contracts/index.js';
import { Event } from '../../../../index.js';
export default class VoiceStateUpdateEvent extends Event {
    name = Events.VoiceStateUpdate;
    priorty;
    async execute(oldState, newState) {
        if (oldState.channel) {
            this.manager.client.emit(Events.VoiceLeave, oldState);
        }
        if (newState.channel) {
            this.manager.client.emit(Events.VoiceJoin, newState);
        }
    }
}
