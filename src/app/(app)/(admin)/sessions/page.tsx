import { AppPageHeader } from "@/components/app-page-header";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { db } from "@/lib/db";
import { columns } from "./columns";

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const currentPage = Number.parseInt((params.page as string) || "1");
	const pageSize = Number.parseInt((params.pageSize as string) || "10");

	const [items, meta] = await db.session
		.paginate({
			orderBy: {
				createdAt: "desc",
			},
		})
		.withPages({
			limit: pageSize,
			page: currentPage,
			includePageCount: true,
		});

	return (
		<>
			<AppPageHeader breadcrumbs={["Sessions"]} />
			<div className="px-4 pb-4">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Sessions</h1>
				</div>
				<DataTable columns={columns} data={items} />
				<div className="my-4" />
				<DataTablePagination
					pageSize={pageSize}
					page={meta.currentPage}
					totalCount={meta.totalCount}
					pageSizeSelectOptions={{
						pageSizeOptions: [5, 10, 20, 35, 100],
					}}
				/>
			</div>
		</>
	);
}
