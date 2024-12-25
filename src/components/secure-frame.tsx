"use client";

import React, { useEffect, useState } from "react";

export type SecureFrameProps = Omit<
	React.ComponentProps<"iframe">,
	"title" | "src" | "sandbox"
> & {
	htmlContent?: string;
	sandboxOptions?: string;
};

export const SecureFrame = React.forwardRef<
	HTMLIFrameElement,
	SecureFrameProps
>(
	(
		{
			sandboxOptions = "allow-scripts allow-same-origin",
			htmlContent,
			...rest
		},
		ref,
	) => {
		const [iframeSrc, setIframeSrc] = useState<string>();

		useEffect(() => {
			const blob = new Blob([htmlContent as any], { type: "text/html" });
			const url = URL.createObjectURL(blob);
			setIframeSrc(url);

			return () => {
				URL.revokeObjectURL(url);
			};
		}, [htmlContent]);

		return (
			<iframe
				title="code"
				ref={ref}
				src={iframeSrc}
				sandbox={sandboxOptions}
				{...rest}
			/>
		);
	},
);
