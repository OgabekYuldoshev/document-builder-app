import { AppPageHeader } from "@/components/app-page-header";
import { CreateNewDocument } from "./create-new-document";

export default function Page() {
	return (
		<>
			<AppPageHeader breadcrumbs={["Documents"]} />
			<div className="px-4 pb-4">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Documents</h1>
					<CreateNewDocument />
				</div>
			</div>
		</>
	);
}
