import {Command} from './command';
import {ApplicationCommandType, Client, CommandInteraction} from 'discord.js';
import {GetTokenResponse} from '../dtos/get-token-response';
import {GetDataResponse} from '../dtos/get-data-response';
import {config} from '../config';

const pwd = config.API_PWD;

export const Rage: Command = {
    name: "rage",
    description: "Returns the 'Joery Rage'",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const tokenResponse: GetTokenResponse = await fetch("https://libreview-proxy.onrender.com/eu/llu/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'product': 'llu.android',
                'version': '4.7',
            },
            body: JSON.stringify({
                email: 'joeryhaelewyck@hotmail.com',
                password: pwd
            })
        })
            .then(response => response.json())
            .catch(error => console.log(error));

        const token = tokenResponse.data.authTicket.token;

        const dataResponse: GetDataResponse = await fetch("https://libreview-proxy.onrender.com/eu/llu/connections/1a594fce-d508-11ec-bb11-0242ac110006/graph", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'product': 'llu.android',
                'version': '4.7'
            }
        }).then(response => response.json());

        const {isHigh, isLow, Value} = dataResponse.data.connection.glucoseMeasurement;

        const content = `Huidige waard: ${Value}\n`+
            `Lage waarde?  ${!isLow ? ':white_check_mark:' : ':thunder_cloud_rain:'}\n`+
            `Hoge waarde?  ${!isHigh ? ':white_check_mark:' : ':thunder_cloud_rain:'}`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }

}