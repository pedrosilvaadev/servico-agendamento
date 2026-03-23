import { TransactionType } from "@/app/generated/prisma/client";
import { z } from "zod";

export const createTransactionSchema = z.object({
  userId: z.string().cuid(),
  type: z.nativeEnum(TransactionType),
  amount: z.coerce.number().positive(),
  occurredAt: z.coerce.date(),
  category: z.string().trim().max(120).optional(),
  description: z.string().trim().max(255).optional(),
  appointmentId: z.string().cuid().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
