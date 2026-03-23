import { AppointmentStatus } from "@/app/generated/prisma/client";
import { z } from "zod";

export const updateAppointmentStatusSchema = z.object({
  userId: z.string().cuid(),
  appointmentId: z.string().cuid(),
  status: z.nativeEnum(AppointmentStatus),
  occurredAt: z.coerce.date().optional(),
});

export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;
