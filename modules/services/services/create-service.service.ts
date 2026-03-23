import { Prisma, PrismaClient } from "@/app/generated/prisma/client";
import {
  CreateServiceInput,
  createServiceSchema,
} from "@/modules/services/schemas/service.schema";

export type CreateServiceResult = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  durationMinute: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
};

function toDecimal(value: number): Prisma.Decimal {
  return new Prisma.Decimal(value.toFixed(2));
}

export async function createServiceService(
  prisma: PrismaClient,
  rawInput: CreateServiceInput,
): Promise<CreateServiceResult> {
  const input = createServiceSchema.parse(rawInput);

  const createdService = await prisma.service.create({
    data: {
      userId: input.userId,
      name: input.name,
      description: input.description,
      durationMinute: input.durationMinute,
      price: toDecimal(input.price),
      isActive: input.isActive,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      description: true,
      durationMinute: true,
      price: true,
      isActive: true,
      createdAt: true,
    },
  });

  return {
    ...createdService,
    price: createdService.price.toNumber(),
  };
}
