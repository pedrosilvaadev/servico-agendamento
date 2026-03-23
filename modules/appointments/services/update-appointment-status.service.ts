import {
  AppointmentStatus,
  Prisma,
  PrismaClient,
  TransactionType,
} from "@/app/generated/prisma/client";
import {
  shouldGenerateAppointmentRevenue,
  shouldUpdateLastVisit,
} from "@/modules/appointments/domain/appointment-rules";
import {
  UpdateAppointmentStatusInput,
  updateAppointmentStatusSchema,
} from "@/modules/appointments/schemas/update-appointment-status.schema";

export type UpdateAppointmentStatusResult = {
  appointmentId: string;
  status: AppointmentStatus;
  transactionId: string | null;
};

function buildAppointmentRevenueDescription(serviceName: string): string {
  return `Receita de atendimento: ${serviceName}`;
}

function ensureIncomeAmount(price: Prisma.Decimal): Prisma.Decimal {
  if (price.lessThanOrEqualTo(0)) {
    throw new Error("Service price must be greater than zero to generate revenue.");
  }

  return price;
}

export async function updateAppointmentStatusService(
  prisma: PrismaClient,
  rawInput: UpdateAppointmentStatusInput,
): Promise<UpdateAppointmentStatusResult> {
  const input = updateAppointmentStatusSchema.parse(rawInput);

  return prisma.$transaction(async (tx) => {
    const appointment = await tx.appointment.findFirst({
      where: {
        id: input.appointmentId,
        userId: input.userId,
      },
      include: {
        service: {
          select: {
            name: true,
            price: true,
          },
        },
        transaction: {
          select: {
            id: true,
            type: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    const now = new Date();
    const shouldGenerateRevenue = shouldGenerateAppointmentRevenue(input.status);

    const updatedAppointment = await tx.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        status: input.status,
        doneAt: shouldGenerateRevenue ? now : null,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (shouldUpdateLastVisit(input.status)) {
      await tx.client.update({
        where: {
          id: appointment.clientId,
        },
        data: {
          lastVisit: now,
        },
      });
    }

    if (!shouldGenerateRevenue && appointment.transaction?.type === TransactionType.INCOME) {
      await tx.transaction.delete({
        where: {
          id: appointment.transaction.id,
        },
      });

      return {
        appointmentId: updatedAppointment.id,
        status: updatedAppointment.status,
        transactionId: null,
      };
    }

    if (!shouldGenerateRevenue) {
      return {
        appointmentId: updatedAppointment.id,
        status: updatedAppointment.status,
        transactionId: appointment.transaction?.id ?? null,
      };
    }

    const amount = ensureIncomeAmount(appointment.service.price);

    if (appointment.transaction?.type === TransactionType.INCOME) {
      const updatedTransaction = await tx.transaction.update({
        where: {
          id: appointment.transaction.id,
        },
        data: {
          amount,
          occurredAt: input.occurredAt ?? now,
          description: buildAppointmentRevenueDescription(appointment.service.name),
        },
        select: {
          id: true,
        },
      });

      return {
        appointmentId: updatedAppointment.id,
        status: updatedAppointment.status,
        transactionId: updatedTransaction.id,
      };
    }

    if (appointment.transaction) {
      throw new Error("Appointment already linked to a non-income transaction.");
    }

    const createdTransaction = await tx.transaction.create({
      data: {
        userId: appointment.userId,
        appointmentId: appointment.id,
        type: TransactionType.INCOME,
        amount,
        occurredAt: input.occurredAt ?? now,
        description: buildAppointmentRevenueDescription(appointment.service.name),
      },
      select: {
        id: true,
      },
    });

    return {
      appointmentId: updatedAppointment.id,
      status: updatedAppointment.status,
      transactionId: createdTransaction.id,
    };
  });
}
