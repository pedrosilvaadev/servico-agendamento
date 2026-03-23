import { z } from "zod";

const optionalTrimmedString = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value))
  .optional();

export const createServiceSchema = z.object({
  userId: z.string().cuid(),
  name: z.string().trim().min(2).max(120),
  description: optionalTrimmedString,
  durationMinute: z.coerce.number().int().positive().max(480),
  price: z.coerce.number().positive().max(999999.99),
  isActive: z.boolean().default(true),
});

export const updateServiceSchema = createServiceSchema
  .omit({ userId: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
