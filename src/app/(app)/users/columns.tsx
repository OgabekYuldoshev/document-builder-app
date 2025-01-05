"use client";

import type { User } from "@prisma/client";

import { normalizeDate } from "@/utils/date";

import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "User id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorFn: (item) => normalizeDate(item.createdAt),
    header: "Created at",
  },
];
