import app from "@/hono/app";
import { handle } from "hono/vercel";

export const GET = handle(app);
export const POST = handle(app);
