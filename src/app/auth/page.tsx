import { ThemeToggle } from "@/components/theme-toggle";
import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { SignIn } from "./sign-in";
export default async function Page() {
	const session = await getUserSession();

	if (session) {
		redirect("/");
	}

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<div className="absolute top-0 left-0 p-4 w-full flex justify-end">
				<ThemeToggle />
			</div>
			<div className="Salom qalesan">
				<SignIn />
			</div>
		</div>
	);
}
