import path from "node:path";

export function getDocumentPath() {
	const projectDir = process.cwd();
	const documentDir = path.join(projectDir, ".documents");
	return documentDir;
}
