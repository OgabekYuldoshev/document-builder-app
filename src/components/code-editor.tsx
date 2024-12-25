import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror, { type ReactCodeMirrorRef, type ReactCodeMirrorProps, } from "@uiw/react-codemirror";
import React from "react";

import { color } from '@uiw/codemirror-extensions-color';
import { githubDark } from '@uiw/codemirror-theme-github';

type CodeEditorProps = Omit<ReactCodeMirrorProps, "theme" | 'extensions'>;

export const CodeEditor = React.forwardRef<ReactCodeMirrorRef, CodeEditorProps>(({ ...rest }, ref) => {
    return <CodeMirror ref={ref} {...rest} theme={githubDark} extensions={[color, langs.html()]} />;
});
