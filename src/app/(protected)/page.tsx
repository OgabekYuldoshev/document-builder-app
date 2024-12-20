import { getUserSession } from "@/lib/auth";

export default async function Page() {
	const session = await getUserSession();

	return <div>{session && <pre>{JSON.stringify(session, null, 2)}</pre>}</div>;
}
