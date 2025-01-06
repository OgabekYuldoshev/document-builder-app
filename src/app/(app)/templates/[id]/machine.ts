"use client";

import { createActorContext } from "@xstate/react";
import { assign, fromPromise, setup } from "xstate";

export const templateMachine = setup({
    types: {
        context: {} as {
            templateId: string;
            content: string;
            newContent: string
            status: 'updating' | 'idle',
            errorMessage: string
        },
        input: {} as {
            templateId: string;
            content: string;
        },
        events: {} as {
            type: 'UPDATE_CONTENT',
            newContent: string
        },
        output: {} as {
            error: string
        }
    },
    actors: {
        updateContent: fromPromise(async ({ input }: { input: string }) => {

            return ''
        })
    }
}).createMachine({
    id: "templateMachine",
    initial: "idle",
    context: ({ input }) => ({
        templateId: input.templateId,
        content: input.content,
        newContent: "",
        status: "idle",
        errorMessage: ''
    }),
    states: {
        idle: {
            on: {
                "UPDATE_CONTENT": {
                    target: "updating",
                    actions: assign({
                        newContent: ({ event }) => event.newContent
                    })
                }
            }
        },
        updating: {
            invoke: {
                id: "updateContent",
                src: "updateContent",
                input: ({ context }) => context.newContent,
                onDone: {
                    target: "idle",
                    actions: assign({
                        content: ({ event }) => event.output,
                        newContent: ""
                    })
                },
                onError: {
                    target: "idle",
                    actions: assign({
                        errorMessage: ({ event }) => (event.error as Error).message,
                    })
                }
            }
        }
    }
});

export const TemplateMachineContext = createActorContext(templateMachine);
