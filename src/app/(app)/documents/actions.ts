"use server";

import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { DEFAULT_DOCUMENT_CONTENT } from "@/utils/constants";
import { getDocumentPath } from "@/utils/get-document-path";
import { pureAction } from "@/utils/pure-action";
import { constantCase } from "change-case";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const $createDocument = pureAction
	.schema(
		z.object({
			name: z.string(),
			key: z.string(),
		}),
	)
	.action(async (values) => {
		const documentDir = getDocumentPath();
		if (!existsSync(documentDir)) {
			await mkdir(documentDir);
		}
		values.key = constantCase(values.key);
		const documentDb = await db.document.findUnique({
			where: { key: values.key },
		});
		if (documentDb)
			throw new Error(
				"Document is already created, please use another key to create a new one",
			);
		const documentPath = path.join(documentDir, `${values.key}.njk`);
		await writeFile(documentPath, DEFAULT_DOCUMENT_CONTENT);
		const session = await getUserSession();
		if (!session) throw new Error("User session is not available");

		return await db.document.create({
			data: {
				key: values.key,
				name: values.name,
				userId: session.user.id,
			},
		});
	});

export const $deleteDocument = pureAction
	.schema(z.string())
	.action(async (id) => {
		const document = await db.document.delete({
			where: { id },
		});
		const documentDir = getDocumentPath();
		const documentPath = path.join(documentDir, `${document.key}.njk`);
		if (existsSync(documentPath)) {
			await rm(documentPath);
		}
		revalidatePath("/documents");
		return document.id;
	});
