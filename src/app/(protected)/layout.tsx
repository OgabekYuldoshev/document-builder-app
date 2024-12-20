import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { type PropsWithChildren } from "react";
export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full">
				{children}
				<SidebarTrigger />
			</main>
		</SidebarProvider>
	);
}
