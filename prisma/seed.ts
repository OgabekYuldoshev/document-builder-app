import { auth } from "@/lib/auth"
import { loadEnvConfig } from "@next/env"
import { consola } from "consola"

const projectDir = process.cwd()

loadEnvConfig(projectDir);

(async () => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email: process.env.ADMIN_USER_EMAIL || 'admin@admin.com',
                password: process.env.ADMIN_USER_PASSWORD || 'admin12345',
                name: 'Admin',
                role: 'user',
            }
        })

        consola.warn(response)
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        consola.error(error.body.message)
    }
})()