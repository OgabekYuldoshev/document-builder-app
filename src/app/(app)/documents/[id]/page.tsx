import { AppPageHeader } from "@/components/app-page-header";
import { notFound } from "next/navigation";
import { getDocument } from "./actions";

interface PageProps {
    params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const { error, data } = await getDocument(id);

    if (error && !data) {
        return notFound();
    }

    return (
        <>
            <AppPageHeader
                breadcrumbs={[{ label: "Documents", href: "/documents" }]}
            />
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">{data?.document.name}</h1>
                </div>
            </div>
        </>
    );
}
