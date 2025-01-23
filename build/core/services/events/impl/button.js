import { Events } from '../../../contracts/index.js';
import { Event } from '../../../../index.js';
export default class ButtonEvent extends Event {
    name = Events.Button;
    async execute(interaction, user) {
        if (!interaction.customId.startsWith("script_"))
            return;
        const context = {
            guild: interaction.guild || undefined,
            member: interaction.member || undefined,
            user: user,
            channel: interaction.channel || undefined,
            content: interaction.customId,
            interaction: interaction
        };
        this.manager.services.engine.event.emit('button', context);
    }
}
;
