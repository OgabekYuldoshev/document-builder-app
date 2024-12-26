"use server";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import { getDocumentContent, getDocumentPath } from "@/utils/get-document-path";
import { pureAction } from "@/utils/pure-action";
import { z } from "zod";

export const $fetchDocument = pureAction
	.schema(z.string())
	.action(async (id) => {
		const document = await db.document.findUnique({ where: { id } });
		if (!document) throw new Error("Document not found");
		const result = await getDocumentContent(document.key);
		if (!result.success) throw new Error(result.error);
		return {
			document,
			content: result.content,
		};
	});

export const $updateDocumentContent = pureAction
	.schema(
		z.object({
			id: z.string(),
			content: z.string(),
		}),
	)
	.action(async ({ id, content }) => {
		const document = await db.document.findUnique({
			where: { id },
		});
		if (!document) throw new Error("Document not found");
		const documentPath = getDocumentPath();
		const documentFile = path.join(documentPath, `${document.key}.njk`);
		await writeFile(documentFile, content);
		return "ok";
	});
