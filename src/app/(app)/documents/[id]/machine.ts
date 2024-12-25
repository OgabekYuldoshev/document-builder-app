import { toast } from "sonner";
import { assign, fromPromise, setup } from "xstate";
import { $updateDocumentContent } from "./actions";

interface UpdateMachineContext {
    documentId: string;
    content: string;
}

type UpdateMachineEvents = {
    type: "onChange";
    content: string;
};
export const updateMachine = setup({
    types: {
        context: {} as UpdateMachineContext,
        events: {} as UpdateMachineEvents,
        input: {} as { content: string; documentId: string },
    },
    actions: {
        updateLocalContent: assign({
            content: ({ event }) => event.content,
        }),
    },
    actors: {
        updateRemoteContent: fromPromise<string, { id: string; content: string }>(
            async ({ input }) => {
                const res = await $updateDocumentContent({
                    id: input.id,
                    content: input.content,
                });

                if (!res.success) {
                    toast.error(res.error)
                    throw res.error;
                }

                return res.data;
            },
        ),
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QFUAOECGAXMARA9gMYCuAtmAHZYB0AlhADZgDE+FAwgBYYUwDaABgC6iUKnyxaWWm1EgAHogAcAZmoBGJQE4ArAHYAbJpUAWAEyqDAGhABPRGbM7qe01qc6VTk0tUBfPxs0TBwCEnIqamJ0bFpeVg5uXjBBESQQcUlpWXTFBBMtLWoBPX0DX1K9ArMbewRTJQ0VARUlHSN1Ex1HAKCY0KIyShpokLioZnlYLGwwagwAMxwAJwAKdQFNgEpmYNmwocjR2N5UuUypGQo5OvUVPRs8nXUDagt1J16QPYHw4eoFmAsIROONmBA2HM4gA3fAAazmx1+hywZ3SF2y11yiBMejM1C0ShM9x0tWUWi+PzwgwiNEBwNB8TAy2W+GW1FQDGwCzZpCi-WpfyoaLEEkuOVAeVx+MJxNKZPy6gCgRAFHwEDgcipB1p5zFmLkeQAtHjqNotCoVO0zHcBGZ3AqjSZXjpNgI7lojO5DJSBTr-vQmHqsldDTianZEB8iqVfSFBSj+WNeMHxVjJYhmgJqD45aTIwg7no4-saf96SDxqmDdiEEazCYzYVLdbbfaGwrneozQIlIYLAZCRYKcqgA */
    id: "UpdateDocument",
    context: ({ input }) => ({
        documentId: input.documentId,
        content: input.content,
    }),
    initial: "idle",
    states: {
        idle: {
            on: {
                onChange: {
                    target: "updating",
                    actions: "updateLocalContent",
                },
            },
        },
        updating: {
            after: {
                1000: {
                    target: "fetching",
                },
            },
            on: {
                onChange: {
                    target: "updating",
                    actions: "updateLocalContent",
                    reenter: true,
                },
            },
        },
        fetching: {
            invoke: {
                id: "updateDocument",
                src: "updateRemoteContent",
                input: ({ context }) => ({
                    id: context.documentId,
                    content: context.content,
                }),
                onDone: {
                    target: "idle",
                },
                onError: {
                    target: "idle",
                },
            },
        },
    },
});
