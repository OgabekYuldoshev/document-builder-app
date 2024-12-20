import { AppPageHeader } from "@/components/app-page-header";
import { getUserSession } from "@/lib/auth";

export default async function Page() {
	const session = await getUserSession();

	return (
		<section>
			<AppPageHeader
				breadcrumbs={["Test", { label: "steinf", href: "/sss" }, "test"]}
			/>
			{session && <pre>{JSON.stringify(session, null, 2)}</pre>}
		</section>
	);
}
