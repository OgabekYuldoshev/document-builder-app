"use server";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { getUserSession } from "@/lib/authentication";
import { getTemplatePath } from "@/lib/file-path";
import { db } from "@/lib/prisma";
import { pureAction } from "@/lib/pure-action";
import { DEFAULT_TEMPLATE_CONTENT } from "@/utils/constants";
import { z } from "zod";

export const $newTemplate = pureAction
	.schema(
		z.object({
			name: z.string(),
		}),
	)
	.action(async ({ name }) => {
		const session = await getUserSession();
		if (!session.success) {
			throw session.error;
		}

		const filePath = await getTemplatePath();

		const newTemplate = await db.template.create({
			data: {
				name,
				userId: session.data.id,
			},
		});

		const templatePath = path.join(filePath, `${newTemplate.id}.html`);

		await writeFile(templatePath, DEFAULT_TEMPLATE_CONTENT);

		return newTemplate;
	});
