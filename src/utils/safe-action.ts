import {
	DEFAULT_SERVER_ERROR_MESSAGE,
	createSafeActionClient,
} from "next-safe-action";
import { zodAdapter } from "next-safe-action/adapters/zod";
import { z } from "zod";

export const action = createSafeActionClient({
	validationAdapter: zodAdapter(),
	defaultValidationErrorsShape: "flattened",
	defineMetadataSchema: () =>
		z.object({ name: z.string().min(1, "Action name is required") }),
	handleServerError: ({ message }, { metadata }) => {
		if (message) {
			console.error(
				`[Server Error] ${metadata.name} threw an error: ${message}`,
			);
			return message;
		}

		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
});
