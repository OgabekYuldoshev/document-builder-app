import { db } from "@/lib/prisma";
import generator from "@/lib/generator";
import { getDocumentContent } from "@/utils/get-document-path";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import n from "nunjucks";
import { z } from "zod";

const app = new Hono().basePath("/api");

app.get(
	"/document/:key",
	zValidator("param", z.object({ key: z.string() })),
	async (c) => {
		const param = c.req.valid("param");
		const document = await db.document.findUnique({
			where: {
				key: param.key,
			},
		});

		if (!document) {
			throw new HTTPException(404, { message: "Document not found" });
		}

		const result = await getDocumentContent(document.key);

		if (!result.success) {
			throw new HTTPException(404, { message: result.error });
		}

		let content = result.content;

		content = n.renderString(content, { test: "salom" });

		const pdfBuffer = await generator({ content });

		if (!pdfBuffer) {
			throw new HTTPException(404, { message: "Interval Error" });
		}

		return c.body(pdfBuffer.buffer, 200, {
			"Content-Type": "application/pdf",
		});
	},
);

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json({ error: err.message, status: err.status }, err.status);
	}

	return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
