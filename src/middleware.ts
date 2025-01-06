import { type NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/jose";

export default async function middleware(request: NextRequest) {
	const session = request.cookies.get("token");

	if (!session) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}
	try {
		await verifyJWT<{ sub: string }>(session.value);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}
}

export const config = {
	matcher: ["/((?!auth|api|_next/static|_next/image|.*\\.png$).*)"],
};
