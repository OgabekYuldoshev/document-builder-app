'use server';

import { readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import { getDocumentPath } from "@/utils/get-document-path";

export async function getDocument(id: string) {
    try {
        const document = await db.document.findUnique({ where: { id } })
        if (!document) throw new Error("Document not found")
        const documentPath = getDocumentPath()
        const documentFile = path.join(documentPath, `${document.key}.html`)
        const documentContent = await readFile(documentFile, 'utf-8')

        return {
            data: {
                document,
                content: documentContent
            },
            error: null
        }

    } catch (error) {
        return {
            data: null,
            error: (error as Error).message,
        };
    }
}