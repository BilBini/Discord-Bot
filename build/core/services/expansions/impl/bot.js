import { Expansion } from '../expansion.js';
import { userMention } from 'discord.js';
export default class BotExpansion extends Expansion {
    name = 'bot';
    async onRequest(context, placeholder) {
        const bot = this.manager.client.user;
        switch (placeholder) {
            case 'id':
                return bot.id;
            case 'username':
                return bot.username;
            case 'mention':
                return userMention(bot.id);
            case 'pfp':
                return bot.displayAvatarURL({ forceStatic: false });
        }
    }
}
