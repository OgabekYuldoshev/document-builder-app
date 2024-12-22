import React from "react";

interface NewUserTemplateProps {
	email: string;
	name: string;
	password: string;
}
export function NewUserTemplate(props: NewUserTemplateProps) {
	return (
		<div>
			<h1>Welcome {props.name}</h1>
			<ul>
				<li>Email: ${props.email}</li>
				<li>Password: ${props.password}</li>
			</ul>
		</div>
	);
}
