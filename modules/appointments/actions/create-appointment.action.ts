"use server";

import { prisma } from "@/lib/prisma";
import { executeAction, ServerActionResult } from "@/lib/server-action";
import {
  CreateAppointmentInput,
  createAppointmentSchema,
} from "@/modules/appointments/schemas/appointment.schema";
import {
  createAppointmentService,
  CreateAppointmentResult,
} from "@/modules/appointments/services/create-appointment.service";

export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<ServerActionResult<CreateAppointmentResult>> {
  return executeAction(async () => {
    const parsed = createAppointmentSchema.parse(input);

    return createAppointmentService(prisma, parsed);
  });
}

export const createAppointmentAction = createAppointment;
