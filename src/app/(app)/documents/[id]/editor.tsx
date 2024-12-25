"use client";

import { CodeEditor } from "@/components/code-editor";
import { SecureFrame } from "@/components/secure-frame";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMachine } from "@xstate/react";
import { CircleCheck, Loader2 } from "lucide-react";
import { useCallback } from "react";
import { z } from "zod";
import { useDocument } from "./context";
import { updateMachine } from "./machine";
const editorSchema = z.object({
	content: z.string(),
});

type EditorValue = z.infer<typeof editorSchema>;
export function Editor() {
	const { content, document } = useDocument();
	const [state, send] = useMachine(updateMachine, {
		input: {
			documentId: document.id,
			content,
		},
	});

	const renderIndecator = useCallback(() => {
		if (state.matches("updating") || state.matches("fetching")) {
			return (
				<div className="flex gap-1 text-muted-foreground text-xs items-center">
					<Loader2 size={20} className="animate-spin" />
					Saving...
				</div>
			);
		}

		return (
			<div className="flex gap-1 text-muted-foreground text-xs items-center">
				<CircleCheck size={20} />
				Saved last changes
			</div>
		);
	}, [state]);

	const handleChange = useCallback(
		(content: string) => {
			send({
				type: "onChange",
				content,
			});
		},
		[send],
	);

	return (
		<>
			<div className="w-full flex justify-end mb-1">{renderIndecator()}</div>
			<ResizablePanelGroup
				direction="horizontal"
				className="border rounded min-h-svh max-h-svh"
			>
				<ResizablePanel
					defaultSize={60}
					minSize={55}
					className="!overflow-auto"
				>
					<CodeEditor value={state.context.content} onChange={handleChange} />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={40} minSize={35}>
					<SecureFrame
						className="w-full h-full"
						htmlContent={state.context.content}
					/>
				</ResizablePanel>
			</ResizablePanelGroup>
		</>
	);
}
