"use server";

import { z } from "zod";

import { ensureDemoUser } from "@/lib/demo-user";
import { executeAction, ServerActionResult } from "@/lib/server-action";
import { createAppointmentAction } from "@/modules/appointments/actions/create-appointment.action";

const createAppointmentFromFormSchema = z.object({
  clientId: z.string().cuid(),
  serviceId: z.string().cuid(),
  scheduledAt: z.string().datetime(),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type CreateAppointmentFromFormInput = z.infer<typeof createAppointmentFromFormSchema>;

export async function createAppointmentFromFormAction(
  rawInput: CreateAppointmentFromFormInput,
): Promise<ServerActionResult<{ id: string }>> {
  return executeAction(async () => {
    const input = createAppointmentFromFormSchema.parse(rawInput);
    const user = await ensureDemoUser();

    const result = await createAppointmentAction({
      userId: user.id,
      clientId: input.clientId,
      serviceId: input.serviceId,
      scheduledAt: new Date(input.scheduledAt),
      notes: input.notes || undefined,
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return {
      id: result.data.id,
    };
  });
}
