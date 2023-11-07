import {Client, GatewayIntentBits} from "discord.js";
import {config} from "./config";
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';

const token = config.DISCORD_TOKEN;

console.log("Bot is starting...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages
    ]
});

ready(client);
interactionCreate(client);

client.login(token);