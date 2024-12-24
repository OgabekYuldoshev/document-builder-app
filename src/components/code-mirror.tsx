"use client";
import { useCodeMirror } from "@/hooks/use-code-mirror";

interface Props {
	value: string;
	onChange?: (value: string) => void;
}
const CodeMirror = (props: Props) => {
	const [ref] = useCodeMirror<HTMLDivElement>({
		value: props.value,
		onChange(state) {
			props.onChange?.(state.doc.toString());
		},
	});

	return <div ref={ref} className="flex-1 w-full" />;
};

export default CodeMirror;
