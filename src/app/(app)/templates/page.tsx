import { AppPageHeader } from "@/components/app-page-header";
import AddTemplateModal from "./add-template";
import { FileText } from "lucide-react";

export default function Page() {
  return (
    <>
      <AppPageHeader breadcrumbs={["Templates"]} />
      <EmptyTemplate />
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
