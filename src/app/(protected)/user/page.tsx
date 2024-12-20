import { AppPageHeader } from "@/components/app-page-header";
import { DataTable } from "@/components/data-table";
import { db } from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import { CreateNewUser } from "./create-new-user";

export default async function Page() {
	const data = await db.user.findMany();

	return (
		<>
			<AppPageHeader breadcrumbs={["User"]} />
			<div className="px-4">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Users</h1>
					<CreateNewUser />
				</div>
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
