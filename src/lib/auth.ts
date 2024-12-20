import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";
import { db } from "./db";

export const auth = betterAuth({
	plugins: [admin()],
	database: prismaAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		enabled: true,
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					if (user.email === "admin@admin.com") {
						return {
							data: {
								...user,
								role: "admin",
							},
						};
					}
				},
			},
		},
	},
});

export const getUserSession = async () => {
	return auth.api.getSession({
		headers: await headers(),
	});
};
