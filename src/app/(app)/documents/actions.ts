"use server";

import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { DEFAULT_DOCUMENT_CONTENT } from "@/utils/constants";
import { getDocumentPath } from "@/utils/get-document-path";
import { constantCase } from "change-case";
import { revalidatePath } from "next/cache";
import type { DocumentFormValue } from "./create-new-document";

export async function createDocumentAction(values: DocumentFormValue) {
	try {
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
		const documentPath = path.join(documentDir, `${values.key}.html`);
		await writeFile(documentPath, DEFAULT_DOCUMENT_CONTENT);
		const session = await getUserSession();
		if (!session) throw new Error("User session is not available");

		const newDocument = await db.document.create({
			data: {
				key: values.key,
				name: values.name,
				userId: session.user.id,
			},
		});

		return {
			data: newDocument,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: (error as Error).message,
		};
	}
}

export async function deleteDocumentAction(id: string) {
	try {
		const document = await db.document.delete({
			where: { id },
		});
		const documentDir = getDocumentPath();
		const documentPath = path.join(documentDir, `${document.key}.html`);
		if (existsSync(documentPath)) {
			await rm(documentPath);
		}
		revalidatePath("/documents");
		return {
			data: document.id,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: (error as Error).message,
		};
	}
}


export async function dublicateDocumentAction(id: string) {
	try {
		const document = await db.document.findUnique({
			where: { id },
		});
		console.log(document)
		return {
			data: document,
			error: null,
		}
	} catch (error) {
		return {
			data: null,
			error: (error as Error).message,
		};
	}
}