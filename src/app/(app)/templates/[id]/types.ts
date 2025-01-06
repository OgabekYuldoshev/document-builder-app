import type { Template } from "@prisma/client";

export type FetchResult = {
	template: Template;
	content: string;
};
