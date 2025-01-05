import { AppPageHeader } from "@/components/app-page-header";

export default async function Page() {
  return (
    <section>
      <AppPageHeader
        breadcrumbs={["Test", { label: "steinf", href: "/sss" }, "test"]}
      />
    </section>
  );
}
