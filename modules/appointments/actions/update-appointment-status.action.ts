"use server";

import { prisma } from "@/lib/prisma";
import {
  UpdateAppointmentStatusInput,
  updateAppointmentStatusSchema,
} from "@/modules/appointments/schemas/update-appointment-status.schema";
import { updateAppointmentStatusService } from "@/modules/appointments/services/update-appointment-status.service";

export async function updateAppointmentStatusAction(input: UpdateAppointmentStatusInput) {
  const parsedInput = updateAppointmentStatusSchema.parse(input);

  return updateAppointmentStatusService(prisma, parsedInput);
}
