"use server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import { getDocumentPath } from "@/utils/get-document-path";
import { pureAction } from "@/utils/pure-action";
import { z } from "zod";

export const $fetchDocument = pureAction
	.schema(z.string())
	.action(async (id) => {
		const document = await db.document.findUnique({ where: { id } });
		if (!document) throw new Error("Document not found");
		const documentPath = getDocumentPath();
		const documentFile = path.join(documentPath, `${document.key}.html`);
		const content = await readFile(documentFile, "utf-8");
		return {
			document,
			content,
		};
	});


export const $updateDocumentContent = pureAction.schema(z.object({
	id: z.string(),
	content: z.string(),
})).action(async ({ id, content }) => {
	const document = await db.document.findUnique({
		where: { id }
	})
	if (!document) throw new Error("Document not found");
	const documentPath = getDocumentPath();
	const documentFile = path.join(documentPath, `${document.key}.html`);
	await writeFile(documentFile, content);
	return "ok"
})