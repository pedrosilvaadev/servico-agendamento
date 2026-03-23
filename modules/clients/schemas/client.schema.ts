import { z } from "zod";

const optionalTrimmedString = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value))
  .optional();

const optionalEmail = z
  .string()
  .trim()
  .email()
  .transform((value) => value.toLowerCase())
  .optional();

const optionalPhone = z
  .string()
  .trim()
  .regex(/^[0-9+()\-\s]{8,20}$/)
  .optional();

export const createClientSchema = z.object({
  userId: z.string().cuid(),
  name: z.string().trim().min(2).max(120),
  email: optionalEmail,
  phone: optionalPhone,
  birthDate: z.coerce.date().optional(),
  notes: optionalTrimmedString,
});

export const updateClientSchema = createClientSchema
  .omit({ userId: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
