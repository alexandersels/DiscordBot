import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, API_PWD } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !API_PWD) {
    throw new Error("Missing environment variables");
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    API_PWD
};