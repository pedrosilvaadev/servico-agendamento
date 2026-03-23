import { AppointmentStatus } from "@/app/generated/prisma/client";
import { z } from "zod";

const optionalTrimmedString = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value))
  .optional();

export const createAppointmentSchema = z.object({
  userId: z.string().cuid(),
  clientId: z.string().cuid(),
  serviceId: z.string().cuid(),
  scheduledAt: z.coerce.date(),
  notes: optionalTrimmedString,
});

export const updateAppointmentSchema = z
  .object({
    status: z.nativeEnum(AppointmentStatus).optional(),
    scheduledAt: z.coerce.date().optional(),
    notes: optionalTrimmedString,
    doneAt: z.coerce.date().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
