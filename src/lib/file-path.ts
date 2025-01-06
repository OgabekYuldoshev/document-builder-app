import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
export async function getTemplatePath() {
	const projectDir = process.cwd();
	const templatePath = path.join(projectDir, ".templates");

	if (!existsSync(templatePath)) {
		await mkdir(templatePath);
	}

	return templatePath;
}
