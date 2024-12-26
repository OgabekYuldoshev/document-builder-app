import { readFile } from "node:fs/promises";
import path from "node:path";

export function getDocumentPath() {
	const projectDir = process.cwd();
	const documentDir = path.join(projectDir, ".documents");
	return documentDir;
}

type DocumentReturnType =
	| {
			success: true;
			content: string;
	  }
	| {
			success: false;
			error: string;
	  };
export async function getDocumentContent(
	key: string,
): Promise<DocumentReturnType> {
	try {
		const documentDir = getDocumentPath();
		const documentPath = path.join(documentDir, `${key}.njk`);
		const content = await readFile(documentPath, "utf-8");
		return {
			success: true,
			content,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Internal error",
		};
	}
}
