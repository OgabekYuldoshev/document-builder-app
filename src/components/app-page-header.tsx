import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import React, {
	type ComponentProps,
	Fragment,
	type PropsWithChildren,
} from "react";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export interface AppPageHeaderProps {
	breadcrumbs: Array<string | { label: string; href: string }>;
}
export function AppPageHeader({ breadcrumbs }: AppPageHeaderProps) {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4 w-full justify-between">
				<div className="flex items-center gap-2">
					<SidebarTrigger />
					<Separator className="h-4 mr-2" orientation="vertical" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<LinkComponent href="/" className="flex gap-2">
									<Home size={18} />
									Home
								</LinkComponent>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							{breadcrumbs.map((item, index) => {
								const hasSeperator = breadcrumbs.length - 1 !== index;
								const isLast = breadcrumbs.length - 1 === index;

								if (typeof item === "string") {
									return (
										<Fragment key={item}>
											<BreadcrumbItem key={item}>
												{isLast ? (
													<BreadcrumbPage>{item}</BreadcrumbPage>
												) : (
													item
												)}
											</BreadcrumbItem>
											{hasSeperator && <BreadcrumbSeparator />}
										</Fragment>
									);
								}

								return (
									<Fragment key={item.href}>
										<BreadcrumbItem>
											<BreadcrumbLink href={item.href}>
												{isLast ? (
													<BreadcrumbPage>{item.label}</BreadcrumbPage>
												) : (
													item.label
												)}
											</BreadcrumbLink>
										</BreadcrumbItem>
										{hasSeperator && <BreadcrumbSeparator />}
									</Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				{/* Left side */}
				<div>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}

function LinkComponent({ children, ...rest }: ComponentProps<typeof Link>) {
	return (
		<BreadcrumbLink asChild>
			<Link {...rest}>{children}</Link>
		</BreadcrumbLink>
	);
}
