"use server";

import { executeAction, ServerActionResult } from "@/lib/server-action";
import { prisma } from "@/lib/prisma";
import {
  CreateTransactionInput,
  createTransactionSchema,
} from "@/modules/financial/schemas/create-transaction.schema";
import {
  createTransactionService,
  CreateTransactionResult,
} from "@/modules/financial/services/create-transaction.service";

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<ServerActionResult<CreateTransactionResult>> {
  return executeAction(async () => {
    const parsedInput = createTransactionSchema.parse(input);

    return createTransactionService(prisma, parsedInput);
  });
}

export const createTransactionAction = createTransaction;
