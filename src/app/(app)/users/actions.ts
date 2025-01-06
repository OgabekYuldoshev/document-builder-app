"use server";

import { hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/prisma";
import { pureAction } from "@/lib/pure-action";
import { z } from "zod";

export const $addNewUser = pureAction
	.schema(
		z.object({
			username: z.string(),
			name: z.string(),
			password: z.string(),
		}),
	)
	.action(async (values) => {
		const hashedPassword = await hashPassword(values.password);

		const user = db.user.create({
			data: {
				username: values.username,
				name: values.name,
				password: hashedPassword,
			},
		});

		return user;
	});
