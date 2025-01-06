"use client";

import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror, {
	type ReactCodeMirrorRef,
	type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import React from "react";

import { color } from "@uiw/codemirror-extensions-color";
import { githubDark } from "@uiw/codemirror-theme-github";

type HtmlEditorProps = Omit<ReactCodeMirrorProps, "theme" | "extensions">;

export const HtmlEditor = React.forwardRef<ReactCodeMirrorRef, HtmlEditorProps>(
	({ ...rest }, ref) => {
		return (
			<CodeMirror
				ref={ref}
				{...rest}
				theme={githubDark}
				extensions={[color, langs.html(), langs.javascript()]}
			/>
		);
	},
);

type JSONEditorProps = Omit<ReactCodeMirrorProps, "theme" | "extensions">;

export const JSONEditor = React.forwardRef<ReactCodeMirrorRef, JSONEditorProps>(
	({ ...rest }, ref) => {
		return (
			<CodeMirror
				ref={ref}
				{...rest}
				theme={githubDark}
				extensions={[color, langs.json()]}
			/>
		);
	},
);
