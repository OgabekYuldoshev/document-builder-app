"use client";

import type { Document } from "@prisma/client";
import React, { type PropsWithChildren } from "react";

interface DocumentContext {
	document: Document;
	content: string;
}

export const DocumentContext = React.createContext<DocumentContext>({
	document: {} as Document,
	content: "",
});

export const useDocument = () => {
	const ctx = React.useContext(DocumentContext);

	if (!ctx) {
		throw new Error("useDocument must be used within a DocumentProvider");
	}

	return ctx;
};

export function DocumentProvider({
	children,
	...rest
}: PropsWithChildren<{
	document: Document;
	content: string;
}>) {
	return (
		<DocumentContext.Provider value={rest}>{children}</DocumentContext.Provider>
	);
}
