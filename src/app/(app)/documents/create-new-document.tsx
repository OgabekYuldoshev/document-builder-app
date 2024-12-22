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
import { z } from "zod";

const documentSchema = z.object({
	name: z.string(),
	key: z.string(),
});

type DocumentFormValue = z.infer<typeof documentSchema>;

export function CreateNewDocument() {
	const router = useRouter();
	const [isOpen, setOpen] = useState(false);
	const form = useForm<DocumentFormValue>({
		resolver: zodResolver(documentSchema),
		defaultValues: {
			key: "",
			name: "",
		},
	});

	function handleClose() {
		form.reset();
		setOpen(false);
	}

	async function onSubmit(values: DocumentFormValue) {
		console.log(values);
	}
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Create a new document</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New document</DialogTitle>
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
										<Input placeholder="Document" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="key"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Document Unique Key</FormLabel>
									<FormControl>
										<Input placeholder="ex: DOCUMENT_UNIQUE_KEY" {...field} />
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
								Create a new document
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
