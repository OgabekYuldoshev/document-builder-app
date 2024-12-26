import { AppPageHeader } from "@/components/app-page-header";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { $fetchDocument } from "./actions";
import { DocumentProvider } from "./context";

interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function Layout({
	params,
	children,
}: PropsWithChildren<PageProps>) {
	const { id } = await params;
	const result = await $fetchDocument(id);

	if (!result.success) {
		return notFound();
	}

	const { document, content } = result.data;

	return (
		<DocumentProvider {...{ document, content }}>
			<AppPageHeader
				breadcrumbs={[
					{ label: "Documents", href: "/documents" },
					document.name,
				]}
			/>
			<div className="px-4 pb-4">
				<div className="flex items-center justify-between mb-2">
					<h1 className="text-2xl font-bold">{document.name}</h1>
				</div>
				{children}
			</div>
		</DocumentProvider>
	);
}
