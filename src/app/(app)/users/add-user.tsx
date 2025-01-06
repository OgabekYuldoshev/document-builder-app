"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { $addNewUser } from "./actions";

const userSchema = z.object({
	username: z.string(),
	name: z.string(),
	password: z.string(),
});

type UserFormValue = z.infer<typeof userSchema>;

export function AddUser() {
	const router = useRouter();
	const [isOpen, setOpen] = useState(false);
	const form = useForm<UserFormValue>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: "",
			name: "",
			password: "",
		},
	});

	function handleClose() {
		form.reset();
		setOpen(false);
	}

	async function onSubmit(values: UserFormValue) {
		const result = await $addNewUser(values);

		if (!result.success) {
			console.error(result.error);
			toast.error(result.error);
			return;
		}

		toast.success("User created successfully!");
		router.refresh();
		handleClose();
	}
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Create a new user</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New User</DialogTitle>
					<DialogDescription>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit.
						Consectetur.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-1 gap-2"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end gap-4 mt-4">
							<DialogClose
								onClick={() => {
									form.reset();
								}}
							>
								Cancel
							</DialogClose>
							<Button disabled={form.formState.isSubmitting} type="submit">
								{form.formState.isSubmitting && (
									<Loader2 className="animate-spin mr-2" />
								)}
								Create a new user
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
