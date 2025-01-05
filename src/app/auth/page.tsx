import { ThemeToggle } from "@/components/theme-toggle";

import { SignIn } from "./sign-in";
import { getUserSession } from "@/lib/authentication";
import { redirect } from "next/navigation";

export default async function Page() {
  const result = await getUserSession();
  console.log(result);

  if (result.success) {
    redirect("/");
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="absolute top-0 left-0 p-4 w-full flex justify-end">
        <ThemeToggle />
      </div>
      <SignIn />
    </div>
  );
}
