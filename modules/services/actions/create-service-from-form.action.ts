"use server";

import { z } from "zod";

import { ensureDemoUser } from "@/lib/demo-user";
import { executeAction, ServerActionResult } from "@/lib/server-action";
import { createServiceAction } from "@/modules/services/actions/create-service.action";

const createServiceFromFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().optional().or(z.literal("")),
  durationMinute: z.coerce.number().int().positive().max(480),
  price: z.coerce.number().positive().max(999999.99),
});

export type CreateServiceFromFormInput = z.infer<typeof createServiceFromFormSchema>;

export async function createServiceFromFormAction(
  rawInput: CreateServiceFromFormInput,
): Promise<ServerActionResult<{ id: string; name: string }>> {
  return executeAction(async () => {
    const input = createServiceFromFormSchema.parse(rawInput);
    const user = await ensureDemoUser();

    const result = await createServiceAction({
      userId: user.id,
      name: input.name,
      description: input.description || undefined,
      durationMinute: input.durationMinute,
      price: input.price,
      isActive: true,
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
