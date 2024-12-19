'use client';

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import React from 'react'

export default function Page() {
    async function onRegister() {
        const { data } = await authClient.signUp.email({
            email: "test@example.com",
            password: "password1234",
            name: "test",
            image: "https://example.com/image.png",
        })

        console.log(data)
    }

    async function onLogin() {
        const { data } = await authClient.signIn.email({
            email: "test@example.com",
            password: "password1234"
        })

        console.log(data)
    }

    return (
        <div>
            Page
            <Button onClick={onRegister}>Register</Button>
            <Button onClick={onLogin}>Login</Button>
        </div>
    )
}
