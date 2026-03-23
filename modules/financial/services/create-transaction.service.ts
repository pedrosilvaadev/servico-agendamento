import { Prisma, PrismaClient } from "@/app/generated/prisma/client";
import {
  CreateTransactionInput,
  createTransactionSchema,
} from "@/modules/financial/schemas/create-transaction.schema";

function toPrismaDecimal(value: number): Prisma.Decimal {
  return new Prisma.Decimal(value.toFixed(2));
}

export async function createTransactionService(
  prisma: PrismaClient,
  rawInput: CreateTransactionInput,
) {
  const input = createTransactionSchema.parse(rawInput);

  return prisma.$transaction(async (tx) => {
    if (input.appointmentId) {
      const appointment = await tx.appointment.findFirst({
        where: {
          id: input.appointmentId,
          userId: input.userId,
        },
        select: {
          id: true,
        },
      });

      if (!appointment) {
        throw new Error("Appointment not found for this user.");
      }
    }

    return tx.transaction.create({
      data: {
        userId: input.userId,
        appointmentId: input.appointmentId,
        type: input.type,
        amount: toPrismaDecimal(input.amount),
        occurredAt: input.occurredAt,
        category: input.category,
        description: input.description,
      },
      select: {
        id: true,
        userId: true,
        appointmentId: true,
        type: true,
        amount: true,
        occurredAt: true,
      },
    });
  });
}
