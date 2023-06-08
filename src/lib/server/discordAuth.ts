import { discord } from "@lucia-auth/oauth/providers";
import { auth } from "./lucia";
import { env } from "../../env";

export const discordAuth = discord(auth, {
    clientId: env.DISCORD_ID,
    clientSecret: env.DISCORD_SECRET,
    redirectUri: "/api/auth/discord/confirm",
    scope: ["identify"]
})