import { AppointmentStatus, PrismaClient } from "@/app/generated/prisma/client";
import {
  CreateAppointmentInput,
  createAppointmentSchema,
} from "@/modules/appointments/schemas/appointment.schema";

export type CreateAppointmentResult = {
  id: string;
  userId: string;
  clientId: string;
  serviceId: string;
  status: AppointmentStatus;
  scheduledAt: Date;
  notes: string | null;
  createdAt: Date;
};

export async function createAppointmentService(
  prisma: PrismaClient,
  rawInput: CreateAppointmentInput,
): Promise<CreateAppointmentResult> {
  const input = createAppointmentSchema.parse(rawInput);

  return prisma.$transaction(async (tx) => {
    const [client, service] = await Promise.all([
      tx.client.findFirst({
        where: {
          id: input.clientId,
          userId: input.userId,
        },
        select: {
          id: true,
        },
      }),
      tx.service.findFirst({
        where: {
          id: input.serviceId,
          userId: input.userId,
          isActive: true,
        },
        select: {
          id: true,
        },
      }),
    ]);

    if (!client) {
      throw new Error("Client not found for this user.");
    }

    if (!service) {
      throw new Error("Service not found or inactive for this user.");
    }

    return tx.appointment.create({
      data: {
        userId: input.userId,
        clientId: input.clientId,
        serviceId: input.serviceId,
        status: AppointmentStatus.SCHEDULED,
        scheduledAt: input.scheduledAt,
        notes: input.notes,
      },
      select: {
        id: true,
        userId: true,
        clientId: true,
        serviceId: true,
        status: true,
        scheduledAt: true,
        notes: true,
        createdAt: true,
      },
    });
  });
}
