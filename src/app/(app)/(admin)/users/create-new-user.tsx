"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export function CreateNewUser() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create a new user</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Salom</DialogTitle>
					<DialogDescription>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit.
						Consectetur.
					</DialogDescription>
				</DialogHeader>
				<div>Test</div>
			</DialogContent>
		</Dialog>
	);
}
