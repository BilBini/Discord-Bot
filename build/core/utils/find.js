import manager from '../../index.js';
/**
 * Find a role by its name or id
 */
export async function findRole(identifier, guild) {
    const search = String(identifier).toLowerCase();
    if (search.includes(';')) {
        const [guildId, name] = search.split(';', 2);
        const identifierGuild = manager.client.guilds.cache.get(guildId);
        if (identifierGuild)
            return rawFindRole(name, identifierGuild);
    }
    if (guild)
        return rawFindRole(search, guild);
    const primaryGuild = manager.client.guilds.cache.get(manager.primaryGuildId);
    if (primaryGuild)
        return rawFindRole(search, primaryGuild);
    return undefined;
}
async function rawFindRole(identifier, guild) {
    if (identifier === 'everyone' || identifier === '@everyone')
        return guild.roles.everyone;
    const role = guild.roles.cache.find(r => r.name.toLowerCase() === identifier || r.id === identifier);
    return role;
}
/**
 * Find a channel by its name or id
 */
export async function findChannel(identifier, guild) {
    const search = String(identifier);
    if (search.includes(';')) {
        const [guildId, name] = search.split(';', 2);
        const identifierGuild = manager.client.guilds.cache.get(guildId);
        if (identifierGuild)
            return rawFindChannel(name, identifierGuild);
    }
    if (guild)
        return rawFindChannel(search, guild);
    const primaryGuild = manager.client.guilds.cache.get(manager.primaryGuildId);
    if (primaryGuild)
        return rawFindChannel(search, primaryGuild);
    return undefined;
}
function isGuildTextBasedChannel(channel) {
    return channel && channel.isTextBased() && !channel.isDMBased() || false;
}
/**
 * Find a text channel by its name or id
 */
export async function findTextChannel(identifier, guild) {
    const channel = await findChannel(identifier, guild);
    if (isGuildTextBasedChannel(channel))
        return channel;
    return undefined;
}
async function rawFindChannel(identifier, guild) {
    const channel = guild.channels.cache.find(c => c.name === identifier || c.id === identifier);
    return channel;
}
