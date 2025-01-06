"use client";
import { createContext, useContext } from "react";
import { TemplateMachineContext } from "./machine";
import type { FetchResult } from "./types";
interface State extends FetchResult { }
export const TemplateContext = createContext<State>({} as FetchResult);

export const useTemplate = () => {
    const ctx = useContext(TemplateContext);
    if (!ctx) {
        throw new Error("useTemplate must be used within TemplateContext");
    }
    return ctx;
};

interface Props {
    value: State;
    children: React.ReactNode;
}


export function TemplateProvider({ value, children }: Props) {
    return (
        <TemplateContext.Provider value={value}>
            <TemplateMachineContext.Provider
                options={{
                    input: {
                        templateId: value.template.id,
                        content: value.content
                    }
                }}>
                {children}
            </TemplateMachineContext.Provider>
        </TemplateContext.Provider>
    );
}
