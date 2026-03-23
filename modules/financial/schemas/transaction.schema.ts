import { TransactionType } from "@/app/generated/prisma/client";
import { z } from "zod";

const optionalTrimmedString = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value))
  .optional();

export const createTransactionSchema = z.object({
  userId: z.string().cuid(),
  type: z.nativeEnum(TransactionType),
  amount: z.coerce.number().positive().max(999999.99),
  occurredAt: z.coerce.date(),
  category: optionalTrimmedString,
  description: optionalTrimmedString,
  appointmentId: z.string().cuid().optional(),
});

export const updateTransactionSchema = z
  .object({
    type: z.nativeEnum(TransactionType).optional(),
    amount: z.coerce.number().positive().max(999999.99).optional(),
    occurredAt: z.coerce.date().optional(),
    category: optionalTrimmedString,
    description: optionalTrimmedString,
    appointmentId: z.string().cuid().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
