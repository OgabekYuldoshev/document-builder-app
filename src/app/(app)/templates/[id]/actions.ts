'use server';

import { readFile } from "node:fs/promises";
import path from "node:path";
import { getTemplatePath } from "@/lib/file-path";
import { db } from "@/lib/prisma";
import { pureAction } from "@/lib/pure-action";
import { z } from "zod";


export const $fetchTemplate = pureAction.schema(z.string()).action(async (id) => {
    const filePath = await getTemplatePath();

    const template = await db.template.findUnique({
        where: { id }
    })

    if (!template) {
        throw new Error("Template not found")
    }


    const templatePath = path.join(filePath, `${template.id}.html`)

    const content = await readFile(templatePath, 'utf-8')

    return {
        template,
        content
    }
})