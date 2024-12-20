import { AppPageHeader } from "@/components/app-page-header";
import { DataTable } from "@/components/data-table";
import { db } from "@/lib/db";
import React from "react";
import { columns } from "./columns";

export default async function Page() {
	const data = await db.user.findMany();

	return (
		<>
			<AppPageHeader breadcrumbs={["User"]} />
			<div className="px-4">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
