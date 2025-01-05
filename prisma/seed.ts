
import { db } from "@/lib/prisma";
import { loadEnvConfig } from "@next/env"
import { hashPassword } from '@/lib/bcrypt';

const projectDir = process.cwd()

loadEnvConfig(projectDir);

(async () => {
    try {
        const response = await db.user.create({
            data: {
                username: process.env.ADMIN_USERNAME || 'admin',
                password: await hashPassword(process.env.ADMIN_PASSWORD || 'admin12345'),
                name: 'Admin',
            }
        })

        console.log(response)
    } catch (error: any) {
        console.error(error)
    }
})()