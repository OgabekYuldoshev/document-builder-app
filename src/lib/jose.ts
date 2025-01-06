import { SignJWT, jwtVerify } from "jose";

export const NEXT_PUBLIC_JWT_SECRET_KEY =
	process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "";

const secret = new TextEncoder().encode(NEXT_PUBLIC_JWT_SECRET_KEY);

export const signJWT = async (payload: { sub: string }) => {
	const alg = "HS256";
	return new SignJWT(payload)
		.setProtectedHeader({ alg })
		.setExpirationTime("1day")
		.setIssuedAt()
		.setSubject(payload.sub)
		.sign(secret);
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload as T;
	} catch (error) {
		throw new Error("Your token has expired.");
	}
};
