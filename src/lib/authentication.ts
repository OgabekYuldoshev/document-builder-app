'use server';

import { cookies } from "next/headers";
import { db } from "./prisma";
import { pureAction } from "@/utils/pure-action";
import { verifyJWT } from "./jose";

export const getUserSession = pureAction.action(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('token');

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { sub } = await verifyJWT<{ sub: string }>(session.value)

  const user = await db.user.findUnique({
    where: { id: sub }
  })

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { password, ...rest } = user

  return rest
})