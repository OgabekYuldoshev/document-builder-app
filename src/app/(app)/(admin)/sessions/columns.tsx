"use client";

import type { Session } from "@prisma/client";

import { normalizeDate } from "@/utils/date";

import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Session>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "userAgent",
		header: "User agent",
	},
	{
		accessorKey: "ipAddress",
		header: "IP Address",
	},
	{
		accessorFn: (item) => normalizeDate(item.createdAt),
		header: "Created at",
	},
];
