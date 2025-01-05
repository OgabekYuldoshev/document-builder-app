import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";

const prismaClientSingleton = () => {
	return new PrismaClient({ log: ["query"] }).$extends(pagination());
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
