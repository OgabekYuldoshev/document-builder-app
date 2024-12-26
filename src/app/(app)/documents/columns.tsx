"use client";

import type { Document } from "@prisma/client";

import { normalizeDate } from "@/utils/date";

import { TableAction, TableActionItem } from "@/components/ui/table";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { $deleteDocument } from "./actions";

export const columns: ColumnDef<Document & { user: { name: string } }>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "key",
		header: "Key",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorFn: (item) => item.user.name,
		header: "Email",
	},
	{
		accessorFn: (item) => normalizeDate(item.createdAt),
		header: "Created at",
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<TableAction>
					<TableActionItem asChild>
						<Link href={`/documents/${row.getValue("id")}`}>Edit</Link>
					</TableActionItem>
					<TableActionItem asChild>
						<Link href={`/documents/${row.getValue("id")}/editor`}>Editor</Link>
					</TableActionItem>
					<TableActionItem onClick={() => $deleteDocument(row.getValue("id"))}>
						Delete
					</TableActionItem>
				</TableAction>
			);
		},
	},
];
