import { updateAppointmentSchema } from "@/modules/appointments/schemas/appointment.schema";
import { z } from "zod";

export const updateAppointmentStatusSchema = z.object({
  userId: z.string().cuid(),
  appointmentId: z.string().cuid(),
  status: updateAppointmentSchema.shape.status.unwrap(),
  occurredAt: z.coerce.date().optional(),
});

export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;
