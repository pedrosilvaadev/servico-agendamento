"use server";

import { ensureDemoUser } from "@/lib/demo-user";
import { prisma } from "@/lib/prisma";
import { executeAction, ServerActionResult } from "@/lib/server-action";

export type AppointmentFormOption = {
  id: string;
  label: string;
};

export type AppointmentFormOptionsResult = {
  clients: AppointmentFormOption[];
  services: AppointmentFormOption[];
};

export async function getAppointmentFormOptionsAction(): Promise<
  ServerActionResult<AppointmentFormOptionsResult>
> {
  return executeAction(async () => {
    const user = await ensureDemoUser();

    const [clients, services] = await Promise.all([
      prisma.client.findMany({
        where: { userId: user.id },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
        },
      }),
      prisma.service.findMany({
        where: { userId: user.id, isActive: true },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
        },
      }),
    ]);

    return {
      clients: clients.map((client) => ({ id: client.id, label: client.name })),
      services: services.map((service) => ({ id: service.id, label: service.name })),
    };
  });
}
