'use client';

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import React from 'react'
import { toast } from 'sonner'

export default function Page() {
	const session = authClient.useSession()

	return (
		<div>
			Page
			{
				session.data && <pre>{JSON.stringify(session, null, 2)}</pre>
			}
			<Button onClick={() => toast.error("test")}>Salom</Button>
		</div>
	)
}
