import { PrismaClient } from "@/app/generated/prisma/client";
import {
  CreateClientInput,
  createClientSchema,
} from "@/modules/clients/schemas/client.schema";

export type CreateClientResult = {
  id: string;
  userId: string;
  name: string;
  email: string | null;
  phone: string | null;
  birthDate: Date | null;
  notes: string | null;
  lastVisit: Date | null;
  createdAt: Date;
};

export async function createClientService(
  prisma: PrismaClient,
  rawInput: CreateClientInput,
): Promise<CreateClientResult> {
  const input = createClientSchema.parse(rawInput);

  return prisma.client.create({
    data: {
      userId: input.userId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      birthDate: input.birthDate,
      notes: input.notes,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      email: true,
      phone: true,
      birthDate: true,
      notes: true,
      lastVisit: true,
      createdAt: true,
    },
  });
}
