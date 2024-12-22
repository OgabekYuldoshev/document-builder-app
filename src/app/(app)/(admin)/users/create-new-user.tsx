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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import consola from "consola";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

enum UserRole {
	user = "user",
	admin = "admin",
}

const userSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
	role: z.nativeEnum(UserRole),
});

type UserFormValue = z.infer<typeof userSchema>;

export function CreateNewUser() {
	const router = useRouter();
	const [isOpen, setOpen] = useState(false);
	const form = useForm<UserFormValue>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
			role: UserRole.user,
		},
	});

	function handleClose() {
		form.reset();
		setOpen(false);
	}

	async function onSubmit(values: UserFormValue) {
		const { error } = await authClient.admin.createUser(values);

		if (error) {
			consola.error(error.message);
			toast.error(error.message);
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="test@example.com"
											{...field}
										/>
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
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={UserRole.admin}>Admin</SelectItem>
											<SelectItem value={UserRole.user}>User</SelectItem>
										</SelectContent>
									</Select>
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
