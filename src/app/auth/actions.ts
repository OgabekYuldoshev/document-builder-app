"use server";

import { verifyPassword } from "@/lib/bcrypt";
import { signJWT } from "@/lib/jose";
import { db } from "@/lib/prisma";
import { pureAction } from "@/lib/pure-action";
import { cookies } from "next/headers";
import { z } from "zod";

export const $signIn = pureAction
	.schema(
		z.object({
			username: z.string(),
			password: z.string(),
		}),
	)
	.action(async ({ username, password }) => {
		const cookieStore = await cookies();
		const user = await db.user.findUnique({
			where: {
				username,
			},
		});

		if (!user) {
			throw new Error("Username or password is incorrect");
		}

		const validPassword = await verifyPassword(password, user.password);

		if (!validPassword) {
			throw new Error("Username or password is incorrect");
		}

		const token = await signJWT({ sub: user.id });

		cookieStore.set("token", token, { httpOnly: true, maxAge: 86400 });

		return {
			token,
		};
	});
