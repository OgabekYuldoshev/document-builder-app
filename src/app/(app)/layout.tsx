import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";
export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col w-full">{children}</main>
		</SidebarProvider>
	);
}
