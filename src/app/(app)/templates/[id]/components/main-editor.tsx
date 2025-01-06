'use client';

import { HtmlEditor } from "@/components/editor";
import { TemplateMachineContext } from "../machine";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export default function MainEditor() {
    const content = TemplateMachineContext.useSelector(state => state.context.content)
    const actionRef = TemplateMachineContext.useActorRef()
    return (
        <div>
            <HtmlEditor value={content} onChange={debounce((newContent: string) => {
                actionRef.send({
                    type: "UPDATE_CONTENT",
                     newContent
                })
            })} />
        </div>
    );
}
