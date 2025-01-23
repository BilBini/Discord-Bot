import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';

// Load environment variables
dotenv.config();
const token = process.env.DISCORD_TOKEN;

// Initialize Discord client
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Event: Bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

// Event: Handle interactions (e.g., slash commands)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    // Handle commands here
});

// Error handling
client.on('error', (error) => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

// Start the bot
client.login(token);

