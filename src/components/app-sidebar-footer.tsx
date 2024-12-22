"use client";

import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import consola from "consola";
import { ChevronUp, LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export type AppSidebarFooterProps = {
	email: string;
	name: string;
};
export function AppSidebarFooter(props: AppSidebarFooterProps) {
	const { email, name } = props;
	async function signOut() {
		const { error, data } = await authClient.signOut();

		if (error) {
			toast.error(error.message);
			consola.error(error);
			return;
		}

		if (data.success) {
			redirect("/auth");
		}
	}

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton className="h-auto">
								<div className="flex items-center">
									<User2 size={18} />
									<div className="flex flex-col ml-1 group-data-[state=collapsed]:hidden">
										<h4 className="text-xs font-semibold">{name}</h4>
										<span className="text-xs text-muted-foreground">
											{email}
										</span>
									</div>
								</div>
								<ChevronUp className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="top"
							className="w-[--radix-popper-anchor-width]"
						>
							<DropdownMenuItem>
								<Link href="/account" className="flex items-center">
									<User2 size={18} className="mr-2" />
									Account
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={signOut}>
								<span className="text-destructive flex items-center">
									<LogOut size={18} className="mr-2" />
									Logout
								</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
