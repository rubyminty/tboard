import { auth } from "$lib/server/lucia";
import { discordAuth } from "$lib/server/discordAuth";

import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const storedState = cookies.get("discord_auth_state");

    if(!state || !storedState || state !== storedState || !code) {
        throw new Response(null, { status: 401 });
    }

    try {
        const { existingUser, providerUser, createUser } = await discordAuth.validateCallback(code);

		const getUser = async () => {
			if (existingUser) return existingUser;
			// create a new user if the user does not exist
			return await createUser({
				// attributes
				username: providerUser.username
			});
		};
		const user = await getUser();
		const session = await auth.createSession(user.userId);
		locals.auth.setSession(session);
    } catch (e) {
        return new Response(null, {
            status: 500
        });
    }
    throw redirect(302, "/");
}