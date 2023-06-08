import { auth } from "$lib/server/lucia";
import { discordAuth } from "$lib/server/discordAuth";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies }) => {
    const [url, state] = await discordAuth.getAuthorizationUrl();

    cookies.set("discord_auth_state", state, {
        path: "/",
        maxAge: 60 * 60
    });

    return new Response(null, {
        status: 302,
        headers: {
            location: url.toString()
        }
    });
}