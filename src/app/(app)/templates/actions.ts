'use server';

import { pureAction } from "@/utils/pure-action";
import { z } from "zod";


export const $newTemplate = pureAction
  .schema(z.object({
    name: z.string()
  })).action(async (values) => {
    console.log(values);
    return {}
  })