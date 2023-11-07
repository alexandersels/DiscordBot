import {Client, Events} from "discord.js";
import {Commands} from '../commands';

export default (client: Client): void => {
    client.on(Events.ClientReady, async () => {
        if (!client.user || !client.application) {
            return;
        }

        client?.application.commands.set(Commands)

        console.log("Discord bot is ready! 🤖");
    });
};