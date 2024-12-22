import { Files, Home, Lock, User } from "lucide-react";

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
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { AppSidebarFooter } from "./app-sidebar-footer";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Documents",
		url: "/documents",
		icon: Files,
	},
];

const adminMenu = [
	{
		title: "Users",
		url: "/users",
		icon: User,
	},
	{
		title: "Sessions",
		url: "/sessions",
		icon: Lock,
	},
];

export async function AppSidebar() {
	const session = await getUserSession();
	const isAdmin = session?.user?.role === "admin";

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
				{isAdmin && (
					<SidebarGroup>
						<SidebarGroupLabel>Admin Menu</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{adminMenu.map((item) => (
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
				)}
			</SidebarContent>
			<AppSidebarFooter
				email={session?.user.email || ""}
				name={session?.user.name || ""}
			/>
		</Sidebar>
	);
}
