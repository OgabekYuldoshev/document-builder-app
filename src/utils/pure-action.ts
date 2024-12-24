import consola from "consola";
import type { z } from "zod";

type ActionReturn<T extends (...args: any) => any> =
	| { success: true; data: Awaited<ReturnType<T>> }
	| { success: false; error: string };

function createPureAction() {
	function action<T extends () => Promise<any>>(actionFn: T) {
		return async (): Promise<ActionReturn<T>> => {
			try {
				const result = await actionFn();
				return {
					success: true,
					data: result,
				};
			} catch (error) {
				return {
					success: false,
					error:
						error instanceof Error
							? error.message
							: "An unknown error occurred",
				};
			}
		};
	}

	function schema<S extends z.ZodSchema<any>>(zodSchema: S) {
		return {
			action<T extends (params: z.infer<S>) => Promise<any>>(actionFn: T) {
				return async (args: z.infer<S>): Promise<ActionReturn<T>> => {
					try {
						const validationSchema = await zodSchema.parseAsync(args);
						const result = await actionFn(validationSchema);
						return {
							success: true,
							data: result,
						};
					} catch (error) {
						consola.error(error);
						return {
							success: false,
							error:
								error instanceof Error
									? error.message
									: "An unknown error occurred",
						};
					}
				};
			},
		};
	}

	return {
		schema,
		action,
	};
}

export const pureAction = createPureAction();
