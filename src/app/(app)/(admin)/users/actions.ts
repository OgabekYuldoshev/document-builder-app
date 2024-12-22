"use server";

import { resend } from "@/lib/resend";
import { NewUserTemplate } from "@/templates/new-user";

export async function sendEmail({
	email,
	password,
	name,
}: { email: string; password: string; name: string }) {
	return await resend.emails.send({
		from: "DocumentApp <yuldashoff1@gmail.com>",
		to: [email],
		subject: "Create a new user account",
		react: NewUserTemplate({ name, email, password }),
	});
}
