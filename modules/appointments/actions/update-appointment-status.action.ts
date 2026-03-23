"use server";

import { executeAction, ServerActionResult } from "@/lib/server-action";
import { prisma } from "@/lib/prisma";
import {
  UpdateAppointmentStatusInput,
  updateAppointmentStatusSchema,
} from "@/modules/appointments/schemas/update-appointment-status.schema";
import {
  updateAppointmentStatusService,
  UpdateAppointmentStatusResult,
} from "@/modules/appointments/services/update-appointment-status.service";

export async function updateAppointmentStatus(
  input: UpdateAppointmentStatusInput,
): Promise<ServerActionResult<UpdateAppointmentStatusResult>> {
  return executeAction(async () => {
    const parsedInput = updateAppointmentStatusSchema.parse(input);

    return updateAppointmentStatusService(prisma, parsedInput);
  });
}

export const updateAppointmentStatusAction = updateAppointmentStatus;
