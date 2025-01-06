import { AppPageHeader } from "@/components/app-page-header";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { $fetchTemplate } from "./actions";
import MainEditor from "./components/main-editor";
import { TemplateProvider } from "./context";

interface Props {
    params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
    const { id } = await params;
    const result = await $fetchTemplate(id);

    if (!result.success) {
        toast.error(result.error);
        redirect("/templates");
    }

    const item = result.data;

    return (
        <TemplateProvider value={result.data}>
            <AppPageHeader
                breadcrumbs={[{ label: "Templates", href: "/templates" }, item.template.name]}
            />

            <MainEditor />
        </TemplateProvider>
    );
}
