import { AppPageHeader } from "@/components/app-page-header";
import { db } from "@/lib/prisma";
import { normalizeDate } from "@/utils/date";
import { FileText } from "lucide-react";
import Link from "next/link";
import AddTemplateModal from "./add-template";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const items = await db.template
    .findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

  return (
    <>
      <AppPageHeader breadcrumbs={["Templates"]} render={
        <AddTemplateModal />
      } />

      {items.length < 1 ? <EmptyTemplate /> : (
        <div className="block px-4">
          <ul className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4">
            {
              items.map((item) => (
                // biome-ignore lint/a11y/useValidAriaRole: <explanation>
                <Link role="li" key={item.id} className="border rounded-lg overflow-hidden" href={`/templates/${item.id}`}>
                  <div className="w-full h-40">
                    <img className="w-full h-full object-cover" src="/placeholder-image.jpg" alt="placeholder-image" />
                  </div>
                  <div className="px-4 py-2 border-t">
                    <h2 className="font-bold mb-1" title={item.name}>{item.name}</h2>
                    <p className="text-xs text-gray-600">{normalizeDate(item.createdAt)}</p>
                  </div>
                </Link>
              ))
            }
          </ul>
        </div>
      )}
    </>
  );
}

function EmptyTemplate() {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <FileText size={32} />
      <div className="my-2 text-center">
        <h1>No templates yet</h1>
        <p className="text-muted-foreground">
          Create a template to get started
        </p>
      </div>
      <AddTemplateModal />
    </div>
  );
}
