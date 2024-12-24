"use server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import { getDocumentPath } from "@/utils/get-document-path";
import { pureAction } from "@/utils/pure-action";
import { z } from "zod";

export const fetchDocument = pureAction
	.schema(z.string())
	.action(async (id) => {
		console.clear();
		console.log(id);
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
