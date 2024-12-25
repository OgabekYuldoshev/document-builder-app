import { AppPageHeader } from "@/components/app-page-header";
import { notFound } from "next/navigation";
import { $fetchDocument } from "./actions";
import { DocumentProvider } from "./context";
import { Editor } from "./editor";

interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
	const { id } = await params;
	const result = await $fetchDocument(id);

	if (!result.success) {
		return notFound();
	}

	const { document, content } = result.data;

	return (
		<DocumentProvider {...{ document, content }}>
			<>
				<AppPageHeader
					breadcrumbs={[
						{ label: "Documents", href: "/documents" },
						document.name,
					]}
				/>
				<div className="px-4 pb-4">
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-2xl font-bold">{document.name}</h1>
					</div>
					<Editor />
				</div>
			</>
		</DocumentProvider>
	);
}
