import { createFetch } from "@better-fetch/fetch";

export const $fetch = createFetch({
	baseURL: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/auth`,
	retry: {
		type: "linear",
		attempts: 3,
		delay: 1000,
	},
});
