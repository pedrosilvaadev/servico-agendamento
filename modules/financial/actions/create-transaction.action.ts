"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateTransactionInput,
  createTransactionSchema,
} from "@/modules/financial/schemas/create-transaction.schema";
import { createTransactionService } from "@/modules/financial/services/create-transaction.service";

export async function createTransactionAction(input: CreateTransactionInput) {
  const parsedInput = createTransactionSchema.parse(input);

  return createTransactionService(prisma, parsedInput);
}
