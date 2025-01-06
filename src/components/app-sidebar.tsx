import { Files, Home, User } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUserSession } from "@/lib/authentication";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppSidebarFooter } from "./app-sidebar-footer";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Templates",
		url: "/templates",
		icon: Files,
	},
];

const settingsMenu = [
	{
		title: "Users",
		url: "/users",
		icon: User,
	},
];

export async function AppSidebar() {
	const session = await getUserSession();

	if (!session.success) {
		redirect("/auth");
	}

	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Admin Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{settingsMenu.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<AppSidebarFooter
				email={session.data.username || ""}
				name={session.data.name || ""}
			/>
		</Sidebar>
	);
}
