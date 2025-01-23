import { Events as DiscordEvents } from 'discord.js';
var BotEvents;
(function (BotEvents) {
    BotEvents["EveryHour"] = "everyHour";
    BotEvents["EveryMinute"] = "everyMinute";
    BotEvents["BotReady"] = "botReady";
    BotEvents["Button"] = "button";
    BotEvents["SelectMenu"] = "selectMenu";
    BotEvents["ModalSubmit"] = "modalSubmit";
    BotEvents["VoiceJoin"] = "voiceJoin";
    BotEvents["VoiceLeave"] = "voiceLeave";
})(BotEvents || (BotEvents = {}));
const Events = {
    ...BotEvents,
    ...DiscordEvents
};
export { Events };
