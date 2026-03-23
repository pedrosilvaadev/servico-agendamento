"use server";

import { z } from "zod";

import { executeAction, ServerActionResult } from "@/lib/server-action";
import { ensureDemoUser } from "@/lib/demo-user";
import { createClientAction } from "@/modules/clients/actions/create-client.action";

const createClientFromFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type CreateClientFromFormInput = z.infer<typeof createClientFromFormSchema>;

export async function createClientFromFormAction(
  rawInput: CreateClientFromFormInput,
): Promise<ServerActionResult<{ id: string; name: string }>> {
  return executeAction(async () => {
    const input = createClientFromFormSchema.parse(rawInput);
    const user = await ensureDemoUser();

    const result = await createClientAction({
      userId: user.id,
      name: input.name,
      email: input.email || undefined,
      phone: input.phone || undefined,
      notes: input.notes || undefined,
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return {
      id: result.data.id,
      name: result.data.name,
    };
  });
}
